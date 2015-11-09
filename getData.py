import json
import urllib2
import sys

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
        for post in allData:
            likeCount += int(post["likes"]["summary"]["total_count"])
            commentCount += int(post["comments"]["summary"]["total_count"])

        result = {"post_count": len(allData), "like_count": likeCount, "comment_count": commentCount, "posts": allData[0:500]}
        result = json.dumps(result, separators=(',',':')).encode('utf-8')
        file = open("data.json", 'w')
        file.write(result)
        file.close

getData("https://graph.facebook.com/820275431431558/feed?fields=actions,from,message,comments.limit(0).summary(true),likes.limit(0).summary(true)&limit=1000&access_token=CAACEdEose0cBAMWyLOUCXF19nZC1uRL3pbhKDLVkNT9toOgTpFOpVwHD6ttaARZBwkGcfAI7qhCZCUs9kdAVMANsbMLxpvOZASIutXr4Tmi9njZCMVQJmKrR7fFW1bfHsBnGeUwZCgC9dTyycOWdZBxTB5jggc0DnbSD9ZCsDZBB2rvWbj8sBWLItcwUmOXU42mUZD")
