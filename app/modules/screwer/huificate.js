module.exports = function(message) {
	let vowels = /[аеёиоуыэюя]/;

	let getWord = function(sentence){
		wordlist = sentence.toLowerCase()
			.replace(/[^a-zа-яё ]/g, " ")
			.replace(/[ ]{2,}/, ' ')
			.trim()
			.split(" ");
		do {
			if (/[a-z]/.test(wordlist[wordlist.length - 1])) {
				delete(wordlist[wordlist.length - 1]);
			} else {
				return wordlist[wordlist.length - 1];
			}
		} while (wordlist.length == 0);
		return false;
	}

	let getWordPart = function(word){
		let pos = word.search(vowels);
		if (pos === -1) {
			return {
				letter: false,
				part: word
			};
		} else {
			return {
				letter: word.substr(pos, 1),
				part: word.substr(pos+1)
			}
		}
	}

	let getAltLetter = function(letter) {
		switch (letter) {
			case 'а':
			case 'я':
				return 'я';
			case 'о':
			case 'ё':
				return 'ё';
			case 'е':
				return 'е';
			case 'у':
			case 'ю':
				return 'ю';
			case 'ы':
				return 'ы';
			case 'и':
				return 'и';
			case 'э':
				return 'э';
			case false:
				return 'й';
		}
	}

	let transformWord = function(word){
		parts = getWordPart(word);
		//Если остаток длиннее одной буквы или единственная гласная не в конце или первая буква в слове не й (чтобы избежать йй), то используем обычный формат
		if (parts.part.length > 1 || !vowels.test(word.substr(word.length-1, 1)) || word.substr(0,1) === 'й') {
			return 'Ху' + getAltLetter(parts.letter) + parts.part;
		} else {
			//Если первая буква гласная - то его сперва поменяем
			if (word.search(vowels) === 0){
				return 'Ху' + getAltLetter(word.substr(0,1)) + word.substr(1);
			} else {
			//А если согласная, то не будем ничего трогать и просто припишем неприличное слово
				return 'Хуй' + word.substr(word.length - 2, 2);
			}
		}
	}

	let transformSentence = function(sentence){
		word = getWord(sentence);
		if (word.replace(/ю/ig, '').substr(0,3) === 'хуй') {
			return 'Нихуя, подловил!';
		}
		return word ? transformWord(word) : false;
	}
	return transformSentence(message);
}
