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
        for post in allData:
            likeCount += int(post["likes"]["summary"]["total_count"])
            commentCount += int(post["comments"]["summary"]["total_count"])

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


getData("https://graph.facebook.com/820275431431558/feed?fields=created_time,actions,from,message,comments.limit(0).summary(true),likes.limit(0).summary(true)&limit=1000&access_token=CAAU51Me0QqABAN7oDn1O2tHPZBcvnvJJF1qWcUsDRZCR2S6Cxs7a94lZCzSAZBl5FbDRLrRYz4AVaZB6sMWpsKC9ZAYldnCyRpLKehBzQe8qAQIwLBjBZAJ3qZBoxYhBEZCMNBguA93RNdPZB1vTRaxSpammHCFTEoMr8XdGj5i0xgifUiP5PGT0UL")
