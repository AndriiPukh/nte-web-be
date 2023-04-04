const Sequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends Sequencer {
  sort(tests) {
    return Array.from(tests).sort((testA, testB) => {
      if (testA.path && testA.path.endsWith('auth.spec.js')) return 1;
      return 0;
    });
  }
}

module.exports = CustomSequencer;
