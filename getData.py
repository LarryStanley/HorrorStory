import json
import urllib2
import sys

token = "EAAU51Me0QqABAH2ZBGX6z6zZBgomLvKriYh7RamtDQ0Phj5XSNtBzJn4sNuT9N2PHf9TLUiMDZADOWuZABaiHiZBM6hVs4eTp15MtYiY3ZAR0h8KxxckUDkcrYPD4djN2wluWZCgOqZAYCRmDVROUgP9DxJDq2SHUXQZD"
activityID = "1058655540859436"

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

        result = {"post_count": len(allData), "like_count": likeCount, "comment_count": commentCount, "posts": allData[0:200]}
        result = json.dumps(result, sort_keys=True, indent=4, ensure_ascii=False).encode('utf-8')
        file = open("data.json", 'w')
        file.write(result)
        file.close

url = "https://graph.facebook.com/" + activityID + "/feed?fields=actions,from,message,comments.limit(0).summary(true),likes.limit(0).summary(true)&limit=1000&access_token=" + token
getData(url)
