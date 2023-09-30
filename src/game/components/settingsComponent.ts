import { Scene } from "phaser";
import { asPercentage } from "../../utils/string";
import { assets } from "../constants/assets";
import { Settings } from "../settings";

export class SettingsComponent extends Phaser.GameObjects.Container {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);
    this.visible = false;

    const settings = scene.game.registry.get('settings') as Settings;

    const bg = scene.add.rectangle(0, 0, scene.sys.game.canvas.width, scene.sys.game.canvas.height, 0x000000, 0.8).setInteractive().on('pointerdown', () => {
      this.close();
    });
    this.add(bg);

    const bgSettings = scene.add.image(0, 0, assets.ui.CARD).setRotation(Phaser.Math.DegToRad(90)).setScale(0.8).setInteractive().on('pointerdown', ({ event }: { event: MouseEvent }) => {
      event.stopPropagation();
    });
    this.add(bgSettings);

    const settingsText = scene.add.text(0, 0, 'Settings', { fontSize: '24px', color: '#fff' }).setOrigin(0.5, 0.5).setY(-220);
    this.add(settingsText);

    scene.input.keyboard?.on('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        this.close();
      }
    });

    const text = scene.add.text(0, 0, 'Press ESC to close', { fontSize: '14px', color: '#fff' }).setOrigin(0.5, 0.5).setY(230);
    this.add(text);

    const closeButton = scene.add.image(0, 0, assets.icon.CLOSE).setOrigin(0.5, 0.5).setX(120).setY(-245).setInteractive().on('pointerdown', () => {
      this.close();
    }).on('pointerover', function () {
      closeButton.setAlpha(0.8);
      scene.input.setDefaultCursor('pointer');
    }).on('pointerout', function () {
      closeButton.setAlpha(1);
      scene.input.setDefaultCursor('default');
    });

    const musicText = scene.add.text(0, 0, 'Music Volume', { fontSize: '18px', color: '#fff' }).setOrigin(0.5, 0.5).setY(-150);
    this.add(musicText);

    const musicValue = scene.add.text(0, 0, asPercentage(settings.getConfig('musicVolume')), { fontSize: '18px', color: '#fff' }).setOrigin(0.5, 0.5).setY(-120);
    this.add(musicValue);

    const increaseVolume = scene.add.image(0, 0, assets.icon.PLUS).setOrigin(0.5, 0.5).setX(50).setY(-120).setInteractive().on('pointerdown', () => {
      const volume = settings.getConfig('musicVolume');
      const newVolume = (Math.floor(volume * 10) + 1) / 10;
      settings.setConfig('musicVolume', Math.min(1, newVolume));
      musicValue.setText(asPercentage(settings.getConfig('musicVolume')));
    }).on('pointerover', function () {
      increaseVolume.setAlpha(0.8);
      scene.input.setDefaultCursor('pointer');
    }).on('pointerout', function () {
      increaseVolume.setAlpha(1);
      scene.input.setDefaultCursor('default');
    });
    this.add(increaseVolume);

    const decreaseVolume = scene.add.image(0, 0, assets.icon.MINUS).setOrigin(0.5, 0.5).setX(-50).setY(-120).setInteractive().on('pointerdown', () => {
      const volume = settings.getConfig('musicVolume');
      const newVolume = (Math.floor(volume * 10) - 1) / 10;
      settings.setConfig('musicVolume', Math.max(0, newVolume));
      musicValue.setText(asPercentage(settings.getConfig('musicVolume')));
    }).on('pointerover', function () {
      decreaseVolume.setAlpha(0.8);
      scene.input.setDefaultCursor('pointer');
    }).on('pointerout', function () {
      decreaseVolume.setAlpha(1);
      scene.input.setDefaultCursor('default');
    });
    this.add(decreaseVolume);

    const fxText = scene.add.text(0, 0, 'FX Volume', { fontSize: '18px', color: '#fff' }).setOrigin(0.5, 0.5).setY(-60);
    this.add(fxText);

    const fxValue = scene.add.text(0, 0, asPercentage(settings.getConfig('fxVolume')), { fontSize: '18px', color: '#fff' }).setOrigin(0.5, 0.5).setY(-30);
    this.add(fxValue);

    const increateFxVolume = scene.add.image(0, 0, assets.icon.PLUS).setOrigin(0.5, 0.5).setX(50).setY(-30).setInteractive().on('pointerdown', () => {
      const volume = settings.getConfig('fxVolume');
      const newVolume = (Math.floor(volume * 10) + 1) / 10;
      settings.setConfig('fxVolume', Math.min(1, newVolume));
      fxValue.setText(asPercentage(settings.getConfig('fxVolume')));
    }).on('pointerover', function () {
      increateFxVolume.setAlpha(0.8);
      scene.input.setDefaultCursor('pointer');
    }).on('pointerout', function () {
      increateFxVolume.setAlpha(1);
      scene.input.setDefaultCursor('default');
    });

    const decreaseFxVolume = scene.add.image(0, 0, assets.icon.MINUS).setOrigin(0.5, 0.5).setX(-50).setY(-30).setInteractive().on('pointerdown', () => {
      const volume = settings.getConfig('fxVolume');
      const newVolume = (Math.floor(volume * 10) - 1) / 10;
      settings.setConfig('fxVolume', Math.max(0, newVolume));
      fxValue.setText(asPercentage(settings.getConfig('fxVolume')));
    }).on('pointerover', function () {
      decreaseFxVolume.setAlpha(0.8);
      scene.input.setDefaultCursor('pointer');
    }).on('pointerout', function () {
      decreaseFxVolume.setAlpha(1);
      scene.input.setDefaultCursor('default');
    });
    this.add(increateFxVolume);
    this.add(decreaseFxVolume);

    this.add(closeButton);
    scene.add.existing(this);
  }

  open() {
    this.alpha = 0;
    this.visible = true;
    this.scene.tweens.add({
      targets: this,
      alpha: 1,
      duration: 300,
    });
  }

  close() {
    this.alpha = 1;
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      duration: 300,
      complete: () => {
        this.visible = false;
      }
    });
  }
}