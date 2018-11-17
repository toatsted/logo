class Parser {
  constructor(text) {
    this.text = text;
    this.index = 0;
  }

  nextToken() {
    let token = '';
    let char = this.text.charAt(this.index);

    if(char === ' ') {
      this.index++;
      return this.nextToken();
    }

    if(char === '[' || char === ']') {
      this.index++;
      return char;
    }

    while( char !== ' ' && this.remainingTokens() ) {
      token += char;
      char = this.text.charAt(++this.index);
    }

    return token;
  }

  remainingTokens() {
    return this.index < this.text.length;
  }

  getRepeat() {
    while( this.text.charAt(this.index++) !== '[' && this.remainingTokens() ) {}
    let start = this.index;
    while( this.text.charAt(this.index++) !== ']' && this.remainingTokens() ) {}
    let end = this.index;
    return this.text.substring(start, end - 1);
  }
}
