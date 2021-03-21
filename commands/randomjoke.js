module.exports = {
  name: 'randomjoke',
  description: 'Return a random joke (mostly time this joke is bad)',
  execute (message) {
    const jokes = [
      'Que se passe-t-il quand deux poissons s\'énervent ?\nLe thon monte.',
      'Où vivent les poules en hiver ?\nÀ Liverpool.',
      'Comment appelle-t-on un nain en prison ?\nUn nain-carcéré.',
      'Quel est le fruit préféré de Donald Trump ?\nCe sont les mûres',
      'Quelle est la différence entre un rappeur et un campeur ?\nLe rappeur nique des mères tandis que le campeur nique des tantes.',
      'Que dit une pillule dans un pot de médicaments ?\nJe me sens comprimée.',
      'Que dit une feuille dans l\'eau ?\nAu secours ! J\'ai papier !',
      'Comment appelle-t-on un magicien qui pratique la sorcellerie avec des yaourts ?\nUn faux-mage blanc.',
      'Qu\'est-ce qui est bleu et qui sent la peinture rouge ?\nLa peinture bleue.',
      'Le chien aboie, le chat miaule et la fourmi cro-onde',
      'J\'ai appellé mon chien "5 km" pour pouvoir dire "J\'ai marché 5 km"\nMais aujourd\'hui j\'ai roulé sur 5 km.',
      'Lorsque je vois des espagnols, je leur dit "Mucho".\nÇa signifie beaucoup pour eux.',
      'Hier je lavais la voiture avec mon fils.\nEn plein milieu il me dit "Papa, tu ne pourrais pas utiliser une éponge ?".'
    ]

    message.channel.send(jokes[Math.floor(Math.random() * jokes.length)])
  }
}
