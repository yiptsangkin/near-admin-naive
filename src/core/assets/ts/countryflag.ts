class CountryFlag {
    public characterMap = {
        A: CountryFlag.getEmojiByUnicode(0x1F1E6),
        B: CountryFlag.getEmojiByUnicode(0x1F1E7),
        C: CountryFlag.getEmojiByUnicode(0x1F1E8),
        D: CountryFlag.getEmojiByUnicode(0x1F1E9),
        E: CountryFlag.getEmojiByUnicode(0x1F1EA),
        F: CountryFlag.getEmojiByUnicode(0x1F1EB),
        G: CountryFlag.getEmojiByUnicode(0x1F1EC),
        H: CountryFlag.getEmojiByUnicode(0x1F1ED),
        I: CountryFlag.getEmojiByUnicode(0x1F1EE),
        J: CountryFlag.getEmojiByUnicode(0x1F1EF),
        K: CountryFlag.getEmojiByUnicode(0x1F1F0),
        L: CountryFlag.getEmojiByUnicode(0x1F1F1),
        M: CountryFlag.getEmojiByUnicode(0x1F1F2),
        N: CountryFlag.getEmojiByUnicode(0x1F1F3),
        O: CountryFlag.getEmojiByUnicode(0x1F1F4),
        P: CountryFlag.getEmojiByUnicode(0x1F1F5),
        Q: CountryFlag.getEmojiByUnicode(0x1F1F6),
        R: CountryFlag.getEmojiByUnicode(0x1F1F7),
        S: CountryFlag.getEmojiByUnicode(0x1F1F8),
        T: CountryFlag.getEmojiByUnicode(0x1F1F9),
        U: CountryFlag.getEmojiByUnicode(0x1F1FA),
        V: CountryFlag.getEmojiByUnicode(0x1F1FB),
        W: CountryFlag.getEmojiByUnicode(0x1F1FC),
        X: CountryFlag.getEmojiByUnicode(0x1F1FD),
        Y: CountryFlag.getEmojiByUnicode(0x1F1FE),
        Z: CountryFlag.getEmojiByUnicode(0x1F1FF)
    }

    public getFlagByChar (char: string) {
        // check if exist '-'
        const self = this
        let countryCode
        if (/-/g.test(char)) {
            // split by '-'
            [, countryCode] = char.split('-')
        } else {
            countryCode = char
        }
        let flagStr = ''
        if (countryCode === 'TW') {
            countryCode = 'HK'
        }
        countryCode.split('').forEach((str: string) => {
            flagStr += self.characterMap[str]
        })
        return flagStr
    }

    static getEmojiByUnicode (unicode: number) {
        return String.fromCodePoint(unicode)
    }
}

export default CountryFlag
