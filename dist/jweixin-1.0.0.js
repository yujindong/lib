// Modified
! function(e, n) {
  "function" == typeof define && (define.amd || define.cmd) ? define(function() {
    return n(e)
  }) : n(e, !0)
}(window, function(e, n) {
  function i(n, i, t) {
    e.WeixinJSBridge ? WeixinJSBridge.invoke(n, o(i), function(e) {
      c(n, e, t)
    }) : d(n, t)
  }

  function t(n, i, t) {
    e.WeixinJSBridge ? WeixinJSBridge.on(n, function(e) {
      t && t.trigger && t.trigger(e), c(n, e, i)
    }) : t ? d(n, t) : d(n, i)
  }

  function o(e) {
    return e = e || {}, e.appId = V.appId, e.verifyAppId = V.appId, e.verifySignType = "sha1", e.verifyTimestamp = V.timestamp + "", e.verifyNonceStr = V.nonceStr, e.verifySignature = V.signature, e
  }

  function r(e) {
    return {
      timeStamp: e.timestamp + "",
      nonceStr: e.nonceStr,
      "package": e.package,
      paySign: e.paySign,
      signType: e.signType || "SHA1"
    }
  }

  function c(e, n, i) {
    var t, o, r;
    switch (delete n.err_code, delete n.err_desc, delete n.err_detail, t = n.errMsg, t || (t = n.err_msg, delete n.err_msg, t = s(e, t, i), n.errMsg = t), i = i || {}, i._complete && (i._complete(n), delete i._complete), t = n.errMsg || "", V.debug && !i.isInnerInvoke && alert(JSON.stringify(n)), o = t.indexOf(":"), r = t.substring(o + 1)) {
      case "ok":
        i.success && i.success(n);
        break;
      case "cancel":
        i.cancel && i.cancel(n);
        break;
      default:
        i.fail && i.fail(n)
    }
    i.complete && i.complete(n)
  }

  function s(e, n) {
    var i, t, o, r;
    if (n) {
      switch (i = n.indexOf(":"), e) {
        case m.config:
          t = "config";
          break;
        case m.openProductSpecificView:
          t = "openProductSpecificView";
          break;
        default:
          t = n.substring(0, i), t = t.replace(/_/g, " "), t = t.replace(/\b\w+\b/g, function(e) {
            return e.substring(0, 1).toUpperCase() + e.substring(1)
          }), t = t.substring(0, 1).toLowerCase() + t.substring(1), t = t.replace(/ /g, ""), -1 != t.indexOf("Wcpay") && (t = t.replace("Wcpay", "WCPay")), o = g[t], o && (t = o)
      }
      r = n.substring(i + 1), "confirm" == r && (r = "ok"), "failed" == r && (r = "fail"), -1 != r.indexOf("failed_") && (r = r.substring(7)), -1 != r.indexOf("fail_") && (r = r.substring(5)), r = r.replace(/_/g, " "), r = r.toLowerCase(), ("access denied" == r || "no permission to execute" == r) && (r = "permission denied"), "config" == t && "function not exist" == r && (r = "ok"), n = t + ":" + r
    }
    return n
  }

  function a(e) {
    var n, i, t, o;
    if (e) {
      for (n = 0, i = e.length; i > n; ++n) t = e[n], o = m[t], o && (e[n] = o);
      return e
    }
  }

  function d(e, n) {
    if (V.debug && !n.isInnerInvoke) {
      var i = g[e];
      i && (e = i), n && n._complete && delete n._complete, console.log('"' + e + '",', n || "")
    }
  }

  function u() {
    if (!("6.0.2" > T || k.systemType < 0)) {
      var e = new Image;
      k.appId = V.appId, k.initTime = v.initEndTime - v.initStartTime, k.preVerifyTime = v.preVerifyEndTime - v.preVerifyStartTime, x.getNetworkType({
        isInnerInvoke: !0,
        success: function(n) {
          k.networkType = n.networkType;
          var i = "https://open.weixin.qq.com/sdk/report?v=" + k.version + "&o=" + k.isPreVerifyOk + "&s=" + k.systemType + "&c=" + k.clientVersion + "&a=" + k.appId + "&n=" + k.networkType + "&i=" + k.initTime + "&p=" + k.preVerifyTime + "&u=" + k.url;
          e.src = i
        }
      })
    }
  }

  function p() {
    return (new Date).getTime()
  }

  function l(n) {
    _ && (e.WeixinJSBridge ? n() : h.addEventListener && h.addEventListener("WeixinJSBridgeReady", n, !1))
  }

  function f() {
    x.invoke || (x.invoke = function(n, i, t) {
      e.WeixinJSBridge && WeixinJSBridge.invoke(n, o(i), t)
    }, x.on = function(n, i) {
      e.WeixinJSBridge && WeixinJSBridge.on(n, i)
    })
  }
  var m, g, h, y, S, _, w, I, T, v, k, V, M, b, x;
  return e.jWeixin ? void 0 : (m = {
    config: "preVerifyJSAPI",
    onMenuShareTimeline: "menu:share:timeline",
    onMenuShareAppMessage: "menu:share:appmessage",
    onMenuShareQQ: "menu:share:qq",
    onMenuShareWeibo: "menu:share:weiboApp",
    previewImage: "imagePreview",
    getLocation: "geoLocation",
    openProductSpecificView: "openProductViewWithPid",
    addCard: "batchAddCard",
    openCard: "batchViewCard",
    chooseWXPay: "getBrandWCPayRequest"
  }, g = function() {
    var e, n = {};
    for (e in m) n[m[e]] = e;
    return n
  }(), h = e.document, y = h.title, S = navigator.userAgent.toLowerCase(), _ = -1 != S.indexOf("micromessenger"), w = -1 != S.indexOf("android"), I = -1 != S.indexOf("iphone") || -1 != S.indexOf("ipad"), T = function() {
    var e = S.match(/micromessenger\/(\d+\.\d+\.\d+)/) || S.match(/micromessenger\/(\d+\.\d+)/);
    return e ? e[1] : ""
  }(), v = {
    initStartTime: p(),
    initEndTime: 0,
    preVerifyStartTime: 0,
    preVerifyEndTime: 0
  }, k = {
    version: 1,
    appId: "",
    initTime: 0,
    preVerifyTime: 0,
    networkType: "",
    isPreVerifyOk: 1,
    systemType: I ? 1 : w ? 2 : -1,
    clientVersion: T,
    url: encodeURIComponent(location.href)
  }, V = {}, M = {
    _completes: []
  }, b = {
    state: 0,
    res: {}
  }, l(function() {
    v.initEndTime = p()
  }), x = {
    config: function(e) {
      V = e, d("config", e), l(function() {
        i(m.config, {
          verifyJsApiList: a(V.jsApiList)
        }, function() {
          M._complete = function(e) {
            v.preVerifyEndTime = p(), b.state = 1, b.res = e
          }, M.success = function() {
            k.isPreVerifyOk = 0
          }, M.fail = function(e) {
            M._fail ? M._fail(e) : b.state = -1
          };
          var e = M._completes;
          return e.push(function() {
            V.debug || u()
          }), M.complete = function(n) {
            for (var i = 0, t = e.length; t > i; ++i) e[i](n);
            M._completes = []
          }, M
        }()), v.preVerifyStartTime = p()
      }), V.beta && f()
    },
    ready: function(e) {
      0 != b.state ? e() : (M._completes.push(e), !_ && V.debug && e())
    },
    error: function(e) {
      "6.0.2" > T || (-1 == b.state ? e(b.res) : M._fail = e)
    },
    checkJsApi: function(e) {
      var n = function(e) {
        var n, i, t = e.checkResult;
        for (n in t) i = g[n], i && (t[i] = t[n], delete t[n]);
        return e
      };
      i("checkJsApi", {
        jsApiList: a(e.jsApiList)
      }, function() {
        return e._complete = function(e) {
          if (w) {
            var i = e.checkResult;
            i && (e.checkResult = JSON.parse(i))
          }
          e = n(e)
        }, e
      }())
    },
    onMenuShareTimeline: function(e) {
      t(m.onMenuShareTimeline, {
        complete: function() {
          i("shareTimeline", {
            title: e.title || y,
            desc: e.title || y,
            img_url: e.imgUrl,
            link: e.link || location.href
          }, e)
        }
      }, e)
    },
    onMenuShareAppMessage: function(e) {
      t(m.onMenuShareAppMessage, {
        complete: function() {
          i("sendAppMessage", {
            title: e.title || y,
            desc: e.desc || "",
            link: e.link || location.href,
            img_url: e.imgUrl,
            type: e.type || "link",
            data_url: e.dataUrl || ""
          }, e)
        }
      }, e)
    },
    onMenuShareQQ: function(e) {
      t(m.onMenuShareQQ, {
        complete: function() {
          i("shareQQ", {
            title: e.title || y,
            desc: e.desc || "",
            img_url: e.imgUrl,
            link: e.link || location.href
          }, e)
        }
      }, e)
    },
    onMenuShareWeibo: function(e) {
      t(m.onMenuShareWeibo, {
        complete: function() {
          i("shareWeiboApp", {
            title: e.title || y,
            desc: e.desc || "",
            img_url: e.imgUrl,
            link: e.link || location.href
          }, e)
        }
      }, e)
    },
    startRecord: function(e) {
      i("startRecord", {}, e)
    },
    stopRecord: function(e) {
      i("stopRecord", {}, e)
    },
    onVoiceRecordEnd: function(e) {
      t("onVoiceRecordEnd", e)
    },
    playVoice: function(e) {
      i("playVoice", {
        localId: e.localId
      }, e)
    },
    pauseVoice: function(e) {
      i("pauseVoice", {
        localId: e.localId
      }, e)
    },
    stopVoice: function(e) {
      i("stopVoice", {
        localId: e.localId
      }, e)
    },
    onVoicePlayEnd: function(e) {
      t("onVoicePlayEnd", e)
    },
    uploadVoice: function(e) {
      i("uploadVoice", {
        localId: e.localId,
        isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
      }, e)
    },
    downloadVoice: function(e) {
      i("downloadVoice", {
        serverId: e.serverId,
        isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
      }, e)
    },
    translateVoice: function(e) {
      i("translateVoice", {
        localId: e.localId,
        isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
      }, e)
    },
    chooseImage: function(e) {
      i("chooseImage", {
        scene: "1|2",
        count: e.count || 9,
        sizeType: e.sizeType || ["original", "compressed"]
      }, function() {
        return e._complete = function(e) {
          if (w) {
            var n = e.localIds;
            n && (e.localIds = JSON.parse(n))
          }
        }, e
      }())
    },
    previewImage: function(e) {
      i(m.previewImage, {
        current: e.current,
        urls: e.urls
      }, e)
    },
    uploadImage: function(e) {
      i("uploadImage", {
        localId: e.localId,
        isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
      }, e)
    },
    downloadImage: function(e) {
      i("downloadImage", {
        serverId: e.serverId,
        isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
      }, e)
    },
    getNetworkType: function(e) {
      var n = function(e) {
        var n, i, t, o = e.errMsg;
        if (e.errMsg = "getNetworkType:ok", n = e.subtype, delete e.subtype, n) e.networkType = n;
        else switch (i = o.indexOf(":"), t = o.substring(i + 1)) {
          case "wifi":
          case "edge":
          case "wwan":
            e.networkType = t;
            break;
          default:
            e.errMsg = "getNetworkType:fail"
        }
        return e
      };
      i("getNetworkType", {}, function() {
        return e._complete = function(e) {
          e = n(e)
        }, e
      }())
    },
    openLocation: function(e) {
      i("openLocation", {
        latitude: e.latitude,
        longitude: e.longitude,
        name: e.name || "",
        address: e.address || "",
        scale: e.scale || 28,
        infoUrl: e.infoUrl || ""
      }, e)
    },
    getLocation: function(e) {
      e = e || {}, i(m.getLocation, {
        type: e.type || "wgs84"
      }, function() {
        return e._complete = function(e) {
          delete e.type
        }, e
      }())
    },
    hideOptionMenu: function(e) {
      i("hideOptionMenu", {}, e)
    },
    showOptionMenu: function(e) {
      i("showOptionMenu", {}, e)
    },
    closeWindow: function(e) {
      e = e || {}, i("closeWindow", {
        immediate_close: e.immediateClose || 0
      }, e)
    },
    hideMenuItems: function(e) {
      i("hideMenuItems", {
        menuList: e.menuList
      }, e)
    },
    showMenuItems: function(e) {
      i("showMenuItems", {
        menuList: e.menuList
      }, e)
    },
    hideAllNonBaseMenuItem: function(e) {
      i("hideAllNonBaseMenuItem", {}, e)
    },
    showAllNonBaseMenuItem: function(e) {
      i("showAllNonBaseMenuItem", {}, e)
    },
    scanQRCode: function(e) {
      e = e || {}, i("scanQRCode", {
        needResult: e.needResult || 0,
        scanType: e.scanType || ["qrCode", "barCode"]
      }, function() {
        return e._complete = function(e) {
          var n, i;
          I && (n = e.resultStr, n && (i = JSON.parse(n), e.resultStr = i && i.scan_code && i.scan_code.scan_result))
        }, e
      }())
    },
    openProductSpecificView: function(e) {
      i(m.openProductSpecificView, {
        pid: e.productId,
        view_type: e.viewType || 0
      }, e)
    },
    addCard: function(e) {
      var n, t, o, r, c = e.cardList,
        s = [];
      for (n = 0, t = c.length; t > n; ++n) o = c[n], r = {
        card_id: o.cardId,
        card_ext: o.cardExt
      }, s.push(r);
      i(m.addCard, {
        card_list: s
      }, function() {
        return e._complete = function(e) {
          var n, i, t, o = e.card_list;
          if (o) {
            for (o = JSON.parse(o), n = 0, i = o.length; i > n; ++n) t = o[n], t.cardId = t.card_id, t.cardExt = t.card_ext, t.isSuccess = t.is_succ ? !0 : !1, delete t.card_id, delete t.card_ext, delete t.is_succ;
            e.cardList = o, delete e.card_list
          }
        }, e
      }())
    },
    chooseCard: function(e) {
      i("chooseCard", {
        app_id: V.appId,
        location_id: e.shopId || "",
        sign_type: e.signType || "SHA1",
        card_id: e.cardId || "",
        card_type: e.cardType || "",
        card_sign: e.cardSign,
        time_stamp: e.timestamp + "",
        nonce_str: e.nonceStr
      }, function() {
        return e._complete = function(e) {
          e.cardList = e.choose_card_info, delete e.choose_card_info
        }, e
      }())
    },
    openCard: function(e) {
      var n, t, o, r, c = e.cardList,
        s = [];
      for (n = 0, t = c.length; t > n; ++n) o = c[n], r = {
        card_id: o.cardId,
        code: o.code
      }, s.push(r);
      i(m.openCard, {
        card_list: s
      }, e)
    },
    chooseWXPay: function(e) {
      i(m.chooseWXPay, r(e), e)
    }
  }, n && (e.wx = e.jWeixin = x), x)
});
