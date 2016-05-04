import json
import urllib2
import sys
import dateutil.parser as dateparser
from datetime import datetime, timedelta
from pytz import timezone
import pytz

allData = list()

def getData(url):
    response = urllib2.urlopen(url)
    data = json.load(response)
    global allData
    allData.extend(data['data'])
    print len(allData)
    if 'paging' in data:
        getData(data['paging']['next'])
    else:
        allData.sort(key=lambda x: x["likes"]["summary"]["total_count"], reverse=True)
        likeCount = 0
        commentCount = 0

        todayLikeCount = 0
        todayCommentCount = 0
        todayData = list()
        joker = list()
        jokerIndex = dict()
        for post in allData:
            likeCount += int(post["likes"]["summary"]["total_count"])
            commentCount += int(post["comments"]["summary"]["total_count"])

            userId = str((post["from"]["id"]))
            if userId in jokerIndex :
                jokerPost = joker[jokerIndex[userId]]["posts"]
                jokerPost.append(post)
                jokerLikeCount = joker[jokerIndex[post["from"]["id"]]]["like_count"] + int(post["likes"]["summary"]["total_count"])
                joker[jokerIndex[userId]] = {"like_count": jokerLikeCount, "posts": jokerPost, "name" : post["from"]["name"]}
            else:
                jokerIndex[userId] = len(jokerIndex)
                jokerPost = list()
                jokerPost.append(post)
                joker.append({"like_count": int(post["likes"]["summary"]["total_count"]), "posts":jokerPost, "name" : post["from"]["name"]})

            this_time_yesterday = datetime.now(pytz.utc) - timedelta(hours=24)

            if (dateparser.parse(post["created_time"]) > this_time_yesterday):
                todayLikeCount += int(post["likes"]["summary"]["total_count"])
                todayCommentCount += int(post["comments"]["summary"]["total_count"])
                todayData.append(post)

        result = {"post_count": len(allData), "like_count": likeCount, "comment_count": commentCount, "posts": allData[0:500]}
        result = json.dumps(result, separators=(',',':')).encode('utf-8')
        file = open("data.json", 'w')
        file.write(result)
        file.close

        result = {"post_count": len(todayData), "like_count": todayLikeCount, "comment_count": todayCommentCount, "posts": todayData[0:500]}
        result = json.dumps(result, separators=(',',':')).encode('utf-8')
        file = open("todayData.json", 'w')
        file.write(result)
        file.close

        joker.sort(key=lambda x: x["like_count"], reverse=True)
        joker = joker[0: 50]
        joker = json.dumps(joker, separators=(',',':')).encode('utf-8')
        file = open("joker.json", "w")
        file.write(joker)
        file.close


getData("https://graph.facebook.com/1545289965796137/feed?fields=created_time,actions,from,message,comments.limit(0).summary(true),likes.limit(0).summary(true)&limit=1000&access_token=CAAWnAJjuBBkBAFHVVisszOvSUlXMecQukJv4Hy5fXXSIQHvcoFnvvMz8ALTZCfrVn8wJYFOulcAO0B6v3dGLfNk0BkZAEf40Dfv5PD0zhkwxD9sUpIkSyfdtlTcuUg5bz8UsDZBZCyOkPPKYNeT1sDMgtagewuxevpjTf4FpZBZBvMhiUYvX7Akk8usZBKGBEUZD")
