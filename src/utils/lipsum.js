/**
 * Funciones para generar textos aleatorios
 */
import { LoremIpsum } from 'lorem-ipsum'

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 6,
    min: 2
  },
  wordsPerSentence: {
    max: 5,
    min: 2
  }
})

export { lorem }
