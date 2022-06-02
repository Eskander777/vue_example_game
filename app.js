const DEFAULT_PLAYER_HEALTH = 100;
const DEFAULT_MONSTER_HEALTH = 100;
const DEFAULT_ROUND = 0;

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: DEFAULT_PLAYER_HEALTH,
      monsterHealth: DEFAULT_MONSTER_HEALTH,
      currentRound: DEFAULT_ROUND,
      winner: null,
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) return { width: "0%" };
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) return { width: "0%" };
      return { width: this.playerHealth + "%" };
    },
    isSpecialAttackEnabled() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  methods: {
    startGame() {
      this.playerHealth = DEFAULT_PLAYER_HEALTH;
      this.monsterHealth = DEFAULT_MONSTER_HEALTH;
      this.currentRound = DEFAULT_ROUND;
      this.winner = null;
    },
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
    },
    healPlayer() {
      this.currentRound++;
      const healthValue = getRandomValue(8, 20);
      if (this.playerHealth + healthValue > 100)
        return (this.playerHealth = 100);

      this.playerHealth += healthValue;
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
    },
  },
});

app.mount("#game");
