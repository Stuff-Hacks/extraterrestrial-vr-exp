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
import matplotlib.pyplot as plt

app = Flask(__name__)


@app.route("/", methods=['GET', 'POST'])
def getHeight():
    r=png.Reader(file=urllib.urlopen('http://ms-mars.mars.asu.edu/?LAYERS=MOLA_128ppd_shade_ne&FORMAT=image/png&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&SRS=EPSG:4326&BBOX=5.625,39.375,7.03125,40.78125&WIDTH=256&HEIGHT=256'))
    rCount, cCount, pngData, metaData = r.asDirect()

    image_2d = numpy.vstack(itertools.imap(numpy.uint8, pngData))
    print(image_2d)
    print(len(image_2d))
    print(len(image_2d[:, :1]))
    print(rCount)
    print(cCount)
    print(metaData)

    return str(json.dumps(image_2d[:, 0::2].tolist()))
    #return str(json.dumps(image_2d.tolist()))



if __name__ == "__main__":
    app.run(debug=True)

