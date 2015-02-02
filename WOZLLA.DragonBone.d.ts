/// <reference path="typings/tsd.d.ts" />
/// <reference path="DragonBones.d.ts" />
declare module WOZLLA.DragonBones {
    class SkeletonRenderer extends WOZLLA.Renderer {
        skeletonSrc: string;
        textureSrc: string;
        armatureName: string;
        armature: dragonBones.Armature;
        _skeletonSrc: any;
        _textureSrc: any;
        _factory: any;
        _skeletonJSONAsset: any;
        _wTextureAtlas: any;
        _armatureName: string;
        _armature: dragonBones.Armature;
        _container: WOZLLA.GameObject;
        init(): void;
        destroy(): void;
        render(renderer: WOZLLA.renderer.IRenderer, flags: number): void;
        loadAssets(callback: Function): void;
        protected initArmature(): void;
    }
}
declare module WOZLLA.DragonBones {
    class WSlot extends dragonBones.Slot {
        private _display;
        constructor();
        dispose(): void;
        /** @private */
        _updateDisplay(value: any): void;
        /** @private */
        _getDisplayIndex(): number;
        /** @private */
        _addDisplayToContainer(container: any, index?: number): void;
        /** @private */
        _removeDisplayFromContainer(): void;
        /** @private */
        _updateTransform(): void;
        /** @private */
        _updateDisplayVisible(value: boolean): void;
        /** @private */
        _updateDisplayColor(aOffset: number, rOffset: number, gOffset: number, bOffset: number, aMultiplier: number, rMultiplier: number, gMultiplier: number, bMultiplier: number): void;
        /** @private */
        _updateDisplayBlendMode(value: string): void;
    }
}
declare module WOZLLA.DragonBones {
    class WTextureAtlas extends WOZLLA.assets.SpriteAtlas implements dragonBones.ITextureAtlas {
        name: string;
        dispose(): void;
        getRegion(subTextureName: string): dragonBones.Rectangle;
        _loadSpriteAtlas(callback: (error: string, image?, spriteData?) => any): void;
        _parseData(data: any): any;
    }
}
declare module WOZLLA.DragonBones {
    function setupWorldClock(): void;
    class WFactory extends dragonBones.BaseFactory {
        constructor();
        /** @private */
        _generateArmature(): dragonBones.Armature;
        /** @private */
        _generateSlot(): dragonBones.Slot;
        /** @private */
        _generateDisplay(textureAtlas: WTextureAtlas, fullName: string, pivotX: number, pivotY: number): any;
    }
}
