from flask import Flask, request, redirect
import json
import sys

import contextlib
import urllib
import urllib2
import requests
import os
import png
import numpy
import itertools

app = Flask(__name__)


@app.route("/", methods=['GET', 'POST'])
def getHeight():
    r=png.Reader(file=urllib.urlopen('http://ms-mars.mars.asu.edu/?LAYERS=MOLA_Color&FORMAT=image/png&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&SRS=EPSG:4326&BBOX=-5.505,-11.25,0,-5.625&WIDTH=512&HEIGHT=512'))
    image_2d = numpy.vstack(itertools.imap(numpy.uint8, r.asDirect()))
    print(image_2d)

    return 0



if __name__ == "__main__":
    app.run(debug=True)

