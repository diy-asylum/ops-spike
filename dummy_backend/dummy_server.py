import tornado.ioloop
import tornado.web
import json

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.set_header('Content-Type', 'application/json; charset="utf-8"')
        input = self.get_argument('input')
        if not input:
            self.write("Must specify input.")
        self.write(json.dumps({'message': input + "OK"}))

class HealthHandler(tornado.web.RequestHandler):
    def get(self):
        self.set_header('Content-Type', 'application/json; charset="utf-8"')
        self.write(json.dumps({'message': "OK"}))
        

application = tornado.web.Application([
    (r"/", HealthHandler),
    (r"/input", MainHandler),
])

if __name__ == "__main__":
    application.listen(12345)
    tornado.ioloop.IOLoop.instance().start()