# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html

import mysql.connector



class ScrapperPipeline(object):

    def __init__(self):
        self.create_connection()
        self.create_table()

    def create_connection(self):
        self.conn = mysql.connector.connect(
            host='localhost',
            user='root',
            password='newsdesk1',
            database='scrapper'
        )
        self.curr = self.conn.cursor()

    def create_table(self):
        self.curr.execute("""DROP TABLE IF EXISTS coman""")
        self.curr.execute("""CREATE TABLE coman(
                        product_name text,
                        product_price text,
                        product_imagelink text)""")

    def process_item(self, item, spider):
        print("Pipleinecomitzacui")
        self.store_db(item)
        return item

    def store_db(self, item):
        self.curr.execute("""insert into coman values (%s,%s,%s)""", (
            item['product_name'][0],
            item['product_price'][0],
            item['product_imagelink'][0]
        ))
        self.conn.commit()
