# WOZLLA.DragonBone.js

DragonBone plugin of WOZLLA.js

## Example

```

    var director = new WOZLLA.Director(document.getElementById('canvas'));
    director.start();

    var gameObj = new WOZLLA.GameObject();
    var skeletonRenderer = new WOZLLA.DragonBones.SkeletonRenderer();
    skeletonRenderer.skeletonSrc = 'skeleton2.json';
    skeletonRenderer.textureSrc = 'texture2.json';
    skeletonRenderer.armatureName = 'dragonBoy';
    gameObj.addComponent(skeletonRenderer);

    gameObj.loadAssets(function() {
        gameObj.init();
        gameObj.transform.setPosition(480, 320);
        skeletonRenderer.armature.animation.gotoAndPlay('stand');
        director.stage.addChild(gameObj);
    });
    
```
