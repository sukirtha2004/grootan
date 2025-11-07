function extractMatches(regex, text) {
  let matches = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    matches.push(match[0]);
  }
  return matches;
}

module.exports = {
  processPII(text) {
    const result = {
      email: [],
      phone: [],
      creditCard: [],
      dob: [],
      name: [],
      maskedText: text,
    };

    // EMAIL
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
    result.email = extractMatches(emailRegex, text);
    result.maskedText = result.maskedText.replace(emailRegex, (match) => {
      return match.replace(/^(.)(.*)(@.*)$/, (m, first, mid, last) => `${first}***${last}`);
    });

    // PHONE NUMBER
    const phoneRegex = /(\+?\d{1,3})?[-.\s]?\(?\d{2,5}\)?[-.\s]?\d{3,5}[-.\s]?\d{3,5}/g;
    result.phone = extractMatches(phoneRegex, text);
    result.maskedText = result.maskedText.replace(phoneRegex, (match) => {
      return match.replace(/\d(?=\d{2})/g, "*");
    });

    // CREDIT CARD
    const creditCardRegex = /\b(?:\d[ -]*?){13,16}\b/g;
    result.creditCard = extractMatches(creditCardRegex, text);
    result.maskedText = result.maskedText.replace(creditCardRegex, (match) => {
      return match.replace(/\d(?=\d{4})/g, "*");
    });

    // DOB (01/15/1990 or Jan 15, 1990)
    const dobRegex = /\b(\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s\d{1,2},\s\d{4})\b/gi;
    result.dob = extractMatches(dobRegex, text);
    result.maskedText = result.maskedText.replace(dobRegex, "**/**/****");

  
    const ignoredWords = ["My", "I", "Give", "This", "That", "The", "We", "You","Will","AI"];

    const nameRegex = /\b(Dr\.?\s)?[A-Z][a-zA-Z]+\b/g;
    result.name = extractMatches(nameRegex, text);

    result.maskedText = result.maskedText.replace(nameRegex, (word) => {
      if (ignoredWords.includes(word)) return word;

      return word
        .split(" ")
        .map((p) => p[0] + "*".repeat(p.length - 1))
        .join(" ");
    });

    return result;
  }
};
