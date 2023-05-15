/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    
    let markov_chain = new Map();
    
    for (let i =0; i < this.words.length; i++)
    {
      let current_word = this.words[i];
      if(markov_chain.has(current_word))
      {
        markov_chain.get(current_word).push(this.words[i+1]);
      }
      else
        markov_chain.set(current_word, new Array().push(this.words[i+1]))
    }
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let key = MarkovMachine.choice(Array.from(this.chains.keys()));
    let out = [];

    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }

    return out.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};