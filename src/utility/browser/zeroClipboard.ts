// #todo

// Simple Set Clipboard System
 * 表示一个 Flash 复制工具。
 */

     * 配置当前使用的 Flash 文件。
     * @inner
     */
     * 初始化指定节点为复制按钮。
     * @param {Object} options 相关的配置。具体支持的字段有：
     * * @param {Element} dom 指定复制按钮节点。
     * * @param {mixed} [text] 要复制的文本或返回要复制文本的函数。其参数为：
     * * * @param {Element} dom 当前相关的节点。
     * * * @returns {String} 返回要复制的文本。
     * * @param {Element} [input] 要复制的文本域。
     * * @param {Function} [callback] Flash 统一事件回调。
     * * @param {Function} [mouseover] 鼠标移到按钮上的回调。
     * * @param {Function} [mouseout] 鼠标移出按钮上的回调。
     * * @param {Function} [success] 复制成功的回调。
     * * @param {Number} [delay=100] 等待 Flash 加载的延时。
     */

            if (options.text instanceof Function) {
                return options.text(dom);
            }
                return options.input.value;
            }
        }
            dom.addEventListener("click", function () {
                window.clipboardData.setData("Text", getContent());
            }, false);
        }

                timer = setTimeout(function () {
                    timer = 0;

                    // 初始化复制 FLASH。
                    if (!ZeroClipboard.movie) {
                        var div = document.createElement('div');
                        div.style.position = 'absolute';
                        div.innerHTML = '<embed id="zeroClipboard" style="position:absolute;top:0;" src="' + ZeroClipboard.moviePath + '" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' + dom.offsetWidth + '" height="' + dom.offsetHeight + '" name="zeroClipboard" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + 'id=zeroClipboard&width=' + dom.offsetWidth + '&height=' + dom.offsetHeight + '" wmode="transparent" />';
                        document.body.appendChild(div);
                        ZeroClipboard.movie = document.getElementById('zeroClipboard');
                    }

                    // 设置回调。

                        // 设置复制的内容。
                        if ((eventName === "load" || eventName === "mouseOver") && ZeroClipboard.movie.setText) {
                            ZeroClipboard.movie.setText(getContent());
                        }

                        var triggerType = eventName === "mouseOver" ? "mouseover" : eventName === 'mouseOut' ? "mouseout" : eventName === 'complete' ? "success" : null;
                    };

                    // 设置按钮样式。
                    ZeroClipboard.dispatch(null, 'mouseOver');

                    // 设置flash样式。
                    var div = window.ZeroClipboard.movie.parentNode;
                    var rect = dom.getBoundingClientRect();
                    div.style.left = rect.left + (window.pageXOffset || window.scrollX) + 'px';
                    div.style.top = rect.top + (window.pageXOffset || window.scrollY) + 'px';

                }, options.delay || 100);
            }, false);
                if (timer) {
                    clearTimeout(timer);
                    timer = 0;
                }
                ZeroClipboard.dispatch(null, 'mouseOut');
            }, false);

        }
        dom.addEventListener("click", function () {
            if (options.input) {
                alert("由于安全限制，自动复制失败。请按 Ctrl+C 手动复制");
            } else {
                prompt("请直接按 Ctrl+C 复制: ", getContent());
            }
        }, false);

    }


//                this.style.display = 'none';
//            };
//                this.style.display = '';
//            };
//                this.removeClass(name);
//            };
//                var classes = this.className.split(/\s+/);
//                    if (classes[k] == name) {
//                        idx = k;
//                    }
//                }
//                    classes.splice(idx, 1);
//                }
//            };
//                return !!this.className.match(new RegExp("\\s*" + name + "\\s*"));
//            };
//        }
//    },
//    },
//        return new ZeroClipboard.Client();
//    },
//            client.receiveEvent(eventName, args);
//        }
//    },
//    },
//            left: 0,
//        };
//            info.left += obj.offsetLeft;
//        }
//    },
//    }
//};

//            this.zIndex = parseInt(this.domElement.style.zIndex, 10) + 1;
//        }
//            appendElem = ZeroClipboard.$(appendElem);
//        } else if (typeof (appendElem) == 'undefined') {
//            appendElem = document.getElementsByTagName('body')[0];
//        }
//            for (var addedStyle in stylesToAdd) {
//                style[addedStyle] = stylesToAdd[addedStyle];
//            }
//        }
//    },
//        } else {
//        }
//    },
//            this.div.style.left = '-2000px';
//        }
//    },
//    },
//            this.hide();
//                body.removeChild(this.div);
//            } catch (e) {
//            }
//        }
//    },
//            this.domElement = ZeroClipboard.$(elem);
//        }
//            var box = ZeroClipboard.getDOMObjectPosition(this.domElement);
//        }
//    },
//    },
//    },
//    },
//    },
//            case 'load':
//                    var self = this;
//                        self.receiveEvent('load', null);
//                    }, 1);
//                }
//                    var self = this;
//                        self.receiveEvent('load', null);
//                    }, 100);
//                }
//                    this.domElement.addClass('hover');
//                }
//                    this.recoverActive = false;
//                        this.domElement.removeClass('active');
//                    }
//                }
//                    this.domElement.addClass('active');
//                }
//                    this.domElement.removeClass('active');
//                }
//        }// switch eventName
//            for (var idx = 0, len = this.handlers[eventName].length; idx < len; idx++) {
//                var func = this.handlers[eventName][idx];
//                } else if ((typeof (func) == 'object') && (func.length == 2)) {
//                } else if (typeof (func) == 'string') {
//                }
//            } // foreach event handler defined
//}