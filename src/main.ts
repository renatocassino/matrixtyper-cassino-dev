import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';
import { GamePlay } from './game/gameplay';
import { MenuScene } from './game/menu/menuScene';
import { PreloadScene } from './game/preload/preloadScene';
import { WaveScene } from './game/round/animations/waveScene';
import { RoundScene } from './game/round/roundScene';
import { ScoreScene } from './game/score/scoreScene';
import App from './page/App.vue';
import './style.css';

createApp(App).use(
  createVuetify({
    components,
    directives,
  }),
).mount('#app');

window.addEventListener('load', () => {
  const config: Phaser.Types.Core.GameConfig = {
    width: Math.min(1200, window.innerWidth),
    height: Math.min(720, window.innerHeight),
    type: Phaser.AUTO,
    parent: 'game',
    backgroundColor: '#000000',
    scene: [PreloadScene, WaveScene, MenuScene, RoundScene, ScoreScene],
  };

  new GamePlay(config);
});
