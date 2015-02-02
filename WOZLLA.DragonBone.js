var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../DragonBones.d.ts"/>
var WOZLLA;
(function (WOZLLA) {
    var DragonBones;
    (function (DragonBones) {
        var SkeletonRenderer = (function (_super) {
            __extends(SkeletonRenderer, _super);
            function SkeletonRenderer() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(SkeletonRenderer.prototype, "skeletonSrc", {
                get: function () {
                    return this._skeletonSrc;
                },
                set: function (value) {
                    this._skeletonSrc = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SkeletonRenderer.prototype, "textureSrc", {
                get: function () {
                    return this._textureSrc;
                },
                set: function (value) {
                    this._textureSrc = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SkeletonRenderer.prototype, "armatureName", {
                get: function () {
                    return this._armatureName;
                },
                set: function (value) {
                    this._armatureName = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SkeletonRenderer.prototype, "armature", {
                get: function () {
                    return this._armature;
                },
                enumerable: true,
                configurable: true
            });
            SkeletonRenderer.prototype.init = function () {
                this.initArmature();
                _super.prototype.init.call(this);
            };
            SkeletonRenderer.prototype.destroy = function () {
                this._skeletonJSONAsset && this._skeletonJSONAsset.release();
                this._skeletonJSONAsset = null;
                this._wTextureAtlas && this._wTextureAtlas.release();
                this._wTextureAtlas = null;
                this._armature && this._armature.dispose();
                this._armature = null;
                this._factory && this._factory.dispose();
                if (this._container) {
                    this._container.destroy();
                    this._container.removeMe();
                    this._container = null;
                }
                _super.prototype.destroy.call(this);
            };
            SkeletonRenderer.prototype.render = function (renderer, flags) {
                this._container.visit(renderer, this.transform, flags);
            };
            SkeletonRenderer.prototype.loadAssets = function (callback) {
                var _this = this;
                var assetLoader;
                if (this._skeletonSrc && this._textureSrc && this._armatureName) {
                    assetLoader = WOZLLA.Director.getInstance().assetLoader;
                    assetLoader.load(this._skeletonSrc, WOZLLA.assets.JSONAsset, function () {
                        var jsonAsset = assetLoader.getAsset(_this._skeletonSrc);
                        if (!jsonAsset) {
                            callback();
                            return;
                        }
                        jsonAsset.retain();
                        assetLoader.load(_this._textureSrc, DragonBones.WTextureAtlas, function () {
                            var wTextureAtlas = assetLoader.getAsset(_this._textureSrc);
                            if (!wTextureAtlas) {
                                jsonAsset.release();
                                callback();
                                return;
                            }
                            wTextureAtlas.retain();
                            _this._skeletonJSONAsset = jsonAsset;
                            _this._wTextureAtlas = wTextureAtlas;
                            callback();
                        });
                    });
                }
                else {
                    callback();
                }
            };
            SkeletonRenderer.prototype.initArmature = function () {
                var skeletonData, factory, armature, container;
                if (this._skeletonJSONAsset && this._wTextureAtlas && this._armatureName) {
                    factory = new DragonBones.WFactory();
                    skeletonData = this._skeletonJSONAsset.cloneData();
                    factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData), skeletonData.name);
                    factory.addTextureAtlas(this._wTextureAtlas, this._wTextureAtlas.name);
                    armature = factory.buildArmature(this._armatureName);
                    container = armature.getDisplay();
                    dragonBones.WorldClock.clock.add(armature);
                    DragonBones.setupWorldClock();
                    this._container = container;
                    this._factory = factory;
                    this._armature = armature;
                }
            };
            return SkeletonRenderer;
        })(WOZLLA.Renderer);
        DragonBones.SkeletonRenderer = SkeletonRenderer;
    })(DragonBones = WOZLLA.DragonBones || (WOZLLA.DragonBones = {}));
})(WOZLLA || (WOZLLA = {}));
/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../DragonBones.d.ts"/>
var WOZLLA;
(function (WOZLLA) {
    var DragonBones;
    (function (DragonBones) {
        var WSlot = (function (_super) {
            __extends(WSlot, _super);
            function WSlot() {
                _super.call(this, this);
                this._display = null;
            }
            WSlot.prototype.dispose = function () {
                if (this._display) {
                    this._display.destroy();
                    this._display.removeMe();
                }
                _super.prototype.dispose.call(this);
                this._display = null;
            };
            /** @private */
            WSlot.prototype._updateDisplay = function (value) {
                this._display = value;
            };
            //Abstract method
            /** @private */
            WSlot.prototype._getDisplayIndex = function () {
                return -1;
            };
            /** @private */
            WSlot.prototype._addDisplayToContainer = function (container, index) {
                if (index === void 0) { index = -1; }
                var gameObjContainer = container;
                if (this._display && gameObjContainer) {
                    gameObjContainer.addChild(this._display);
                }
            };
            /** @private */
            WSlot.prototype._removeDisplayFromContainer = function () {
                if (this._display && this._display.parent) {
                    this._display.parent.removeChild(this._display);
                }
            };
            /** @private */
            WSlot.prototype._updateTransform = function () {
                var trans;
                if (this._display) {
                    trans = this._display.transform;
                    trans.__local_matrix = this._globalTransformMatrix;
                    trans.dirty = true;
                }
            };
            /** @private */
            WSlot.prototype._updateDisplayVisible = function (value) {
                if (this._display && this._parent) {
                    this._display.visible = this._parent._visible && this._visible && value;
                }
            };
            /** @private */
            WSlot.prototype._updateDisplayColor = function (aOffset, rOffset, gOffset, bOffset, aMultiplier, rMultiplier, gMultiplier, bMultiplier) {
                _super.prototype._updateDisplayColor.call(this, aOffset, rOffset, gOffset, bOffset, aMultiplier, rMultiplier, gMultiplier, bMultiplier);
                if (this._display) {
                    var spriteRenderer = this._display.renderer;
                    if (spriteRenderer) {
                        spriteRenderer.alpha = aMultiplier;
                    }
                }
            };
            /** @private */
            WSlot.prototype._updateDisplayBlendMode = function (value) {
                if (this._display && value) {
                }
            };
            return WSlot;
        })(dragonBones.Slot);
        DragonBones.WSlot = WSlot;
    })(DragonBones = WOZLLA.DragonBones || (WOZLLA.DragonBones = {}));
})(WOZLLA || (WOZLLA = {}));
/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../DragonBones.d.ts"/>
var WOZLLA;
(function (WOZLLA) {
    var DragonBones;
    (function (DragonBones) {
        function getFileName(url) {
            var idx = url.lastIndexOf('/');
            if (idx !== -1) {
                return url.substr(idx + 1, url.length);
            }
            return url;
        }
        var WTextureAtlas = (function (_super) {
            __extends(WTextureAtlas, _super);
            function WTextureAtlas() {
                _super.apply(this, arguments);
            }
            WTextureAtlas.prototype.dispose = function () {
            };
            WTextureAtlas.prototype.getRegion = function (subTextureName) {
                var sprite = this.getSprite(subTextureName);
                var frame = sprite.frame;
                return new dragonBones.Rectangle(frame.x, frame.y, frame.width, frame.height);
            };
            WTextureAtlas.prototype._loadSpriteAtlas = function (callback) {
                var _this = this;
                WOZLLA.utils.Ajax.request({
                    url: this._metaSrc,
                    dataType: 'json',
                    success: function (data) {
                        var imageSuffix = data.imagePath;
                        var metaFileName = getFileName(_this._metaSrc);
                        _this._imageSrc = _this._metaSrc.replace(new RegExp(metaFileName + '$'), imageSuffix);
                        _this._loadImage(function (error, image) {
                            if (error) {
                                callback && callback(error);
                            }
                            else {
                                var textureData = _this._parseData(data);
                                _this.name = textureData.name;
                                callback && callback(null, image, textureData);
                            }
                        });
                    },
                    error: function (err) {
                        callback('Fail to load sprite: ' + _this._metaSrc + ', ' + err.code + ':' + err.message);
                    }
                });
            };
            WTextureAtlas.prototype._parseData = function (data) {
                var spriteData = {
                    name: data.name,
                    frames: {}
                };
                data.SubTexture.forEach(function (frameData) {
                    spriteData.frames[frameData.name] = { frame: frameData };
                });
                return spriteData;
            };
            return WTextureAtlas;
        })(WOZLLA.assets.SpriteAtlas);
        DragonBones.WTextureAtlas = WTextureAtlas;
    })(DragonBones = WOZLLA.DragonBones || (WOZLLA.DragonBones = {}));
})(WOZLLA || (WOZLLA = {}));
/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../DragonBones.d.ts"/>
/// <reference path="WSlot.ts"/>
/// <reference path="WTextureAtlas.ts"/>
var WOZLLA;
(function (WOZLLA) {
    var DragonBones;
    (function (DragonBones) {
        var clockSetup = false;
        function setupWorldClock() {
            if (clockSetup) {
                return;
            }
            clockSetup = true;
            WOZLLA.Director.getInstance().scheduler.scheduleLoop(function () {
                dragonBones.WorldClock.clock.advanceTime(1 / 60);
            });
        }
        DragonBones.setupWorldClock = setupWorldClock;
        var WFactory = (function (_super) {
            __extends(WFactory, _super);
            function WFactory() {
                _super.call(this, this);
            }
            /** @private */
            WFactory.prototype._generateArmature = function () {
                var container = new WOZLLA.GameObject();
                container.init();
                return new dragonBones.Armature(container);
            };
            /** @private */
            WFactory.prototype._generateSlot = function () {
                return new DragonBones.WSlot();
            };
            /** @private */
            WFactory.prototype._generateDisplay = function (textureAtlas, fullName, pivotX, pivotY) {
                var gameObj = new WOZLLA.GameObject();
                var spriteRenderer = new WOZLLA.component.SpriteRenderer();
                spriteRenderer.sprite = textureAtlas.getSprite(fullName);
                spriteRenderer.spriteOffset = {
                    x: pivotX / spriteRenderer.sprite.frame.width,
                    y: pivotY / spriteRenderer.sprite.frame.height
                };
                gameObj.addComponent(spriteRenderer);
                gameObj.init();
                return gameObj;
            };
            return WFactory;
        })(dragonBones.BaseFactory);
        DragonBones.WFactory = WFactory;
    })(DragonBones = WOZLLA.DragonBones || (WOZLLA.DragonBones = {}));
})(WOZLLA || (WOZLLA = {}));
//# sourceMappingURL=WOZLLA.DragonBone.js.map