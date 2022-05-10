#coding:utf-8
import requests
import time
from bs4 import BeautifulSoup as bp

print('Langzi.Fun 自动推送开启....','utf-8')
time.sleep(0.5)
# site_url = 'https://www.fengyuwusong.cn/baidusitemap.xml'
#
# try:
#     print('Langzi.Fun 获取sitemap链接....','utf-8')
with open("public/baidusitemap.xml") as f:
    data_ = bp(f,'xml')
# except Exception as e:
#     print(e)

list_url=[]

def get_(data):
    headers={'User-Agent':'curl/7.12.1 ',
             'Content-Type':'text/plain '}
    try:
        r = requests.post(url='http://data.zz.baidu.com/urls?site=https://www.fengyuwusong.cn&token=EZnSLTK6cftAyc6V',data=data)
        print(r.status_code)
        print(r.content)
    except Exception as e:
        print(e)

print('---------------------------------')
for x,y in enumerate(data_.find_all('loc')):
    print(x,y.string)
    list_url.append(y.string.replace('http://','http://www.'))

print('---------------------------------')

print('Langzi.Fun 开始推送....','utf-8')

for x in list_url:
    print('Langzi.Fun 当前推送条目为: %s' % str(x))
    get_(x)
