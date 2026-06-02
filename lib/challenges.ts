import type { DailyChallenge, JourneyLength } from "./types";

// Dias de abertura compartilhados por todas as jornadas (7, 14 e 21).
// Toda jornada ACSM começa do mesmo lugar: nomear o medo e desobedecer a fuga.
const openingChallenges: DailyChallenge[] = [
  {
    day: 1,
    title: "Nomeie o medo que manda",
    diagnosis:
      "O medo fica mais forte quando opera sem nome. Hoje você vai tirar ele do escuro e parar de chamar fuga de escolha.",
    action:
      "Escreva uma tarefa pequena que você está adiando e complete apenas os primeiros 10 minutos.",
    reflectionPrompt:
      "Qual medo tentou decidir por você antes da ação começar?",
    closingPhrase:
      "Nomear o medo não resolve tudo. Mas impede que ele continue fingindo ser você.",
  },
  {
    day: 2,
    title: "Quebre a fuga automática",
    diagnosis:
      "A fuga quase sempre chega antes da consciência. Hoje o trabalho é perceber o momento exato em que você começa a negociar com ela.",
    action:
      "Escolha uma microação que você normalmente evitaria e faça antes de explicar para si mesmo por que não deveria.",
    reflectionPrompt:
      "Que justificativa apareceu para proteger sua fuga?",
    closingPhrase:
      "Você não precisa discutir com o medo. Precisa desobedecer uma vez.",
  },
  {
    day: 3,
    title: "Faça pequeno, mas real",
    diagnosis:
      "O medo transforma o início em sentença. Uma ação pequena devolve o problema ao tamanho que ele realmente tem.",
    action:
      "Execute uma versão mínima de algo importante: enviar, pedir, organizar, escrever ou começar por 15 minutos.",
    reflectionPrompt:
      "O que ficou menor depois que você começou?",
    closingPhrase:
      "O primeiro passo não prova que você venceu. Prova que o medo perdeu autoridade por alguns minutos.",
  },
  {
    day: 4,
    title: "Exposição controlada",
    diagnosis:
      "A exposição assusta porque tira você do esconderijo. Mas esconder-se também cobra um preço silencioso.",
    action:
      "Mostre uma ideia simples, peça uma opinião ou tome uma atitude visível em um ambiente seguro.",
    reflectionPrompt:
      "O que você imaginou que aconteceria, e o que aconteceu de fato?",
    closingPhrase:
      "A realidade costuma ser menos cruel do que a cena que o medo ensaia dentro de você.",
  },
  {
    day: 5,
    title: "Disciplina sem acordo emocional",
    diagnosis:
      "Esperar vontade é entregar o comando ao humor do dia. Disciplina, aqui, não é prisão. É não deixar o medo votar sozinho.",
    action:
      "Faça uma tarefa necessária por 20 minutos, mesmo sem vontade, sem tentar transformar isso em grande performance.",
    reflectionPrompt:
      "Qual emoção você esperava mudar antes de agir?",
    closingPhrase:
      "Você não precisa estar pronto para começar. Às vezes começar é o que encerra a negociação.",
  },
  {
    day: 6,
    title: "Revise o padrão antigo",
    diagnosis:
      "O padrão se repete porque parece familiar. Hoje você vai observar a rota antiga sem se confundir com ela.",
    action:
      "Liste três situações recentes em que você fugiu, travou ou adiou. Escolha uma e faça uma ação corretiva pequena.",
    reflectionPrompt:
      "Que padrão aparece quando você olha para essas fugas juntas?",
    closingPhrase:
      "Você não é o padrão. Você é quem começou a enxergá-lo.",
  },
];

// Fechamento da jornada de 7 dias.
const sevenDayFinale: DailyChallenge = {
  day: 7,
  title: "Reconstrua a decisão",
  diagnosis:
    "A jornada não termina apagando o medo. Ela termina mostrando que você pode agir sem pedir permissão a ele.",
  action:
    "Repita a ação mais importante da semana ou conclua uma pendência que ainda está mantendo sua vida pequena.",
  reflectionPrompt:
    "O que mudou na forma como você responde ao medo?",
  closingPhrase:
    "Coragem não é ausência de medo. É quando o medo fala e você não obedece automaticamente.",
};

export const sevenDayChallenges: DailyChallenge[] = [...openingChallenges, sevenDayFinale];

export const fourteenDayChallenges: DailyChallenge[] = [
  ...openingChallenges,
  {
    day: 7,
    title: "Sustente sem recompensa",
    diagnosis:
      "A primeira semana cria empolgação. A segunda começa quando a empolgação acaba e sobra só a escolha. É aqui que a maioria volta a obedecer.",
    action:
      "Repita a ação mais importante dos últimos dias quando ela já não tiver brilho de novidade. Faça morno, mas faça.",
    reflectionPrompt:
      "O que muda na sua vontade quando ninguém está observando o esforço?",
    closingPhrase:
      "Constância não é intensidade. É continuar depois que o ânimo foi embora.",
  },
  {
    day: 8,
    title: "Encare o desconforto sem anestesia",
    diagnosis:
      "Você tem anestesias prediletas: a tela, a comida, a distração, o adiamento elegante. Elas removem o desconforto e levam a ação junto.",
    action:
      "Identifique a sua anestesia mais usada e passe 30 minutos sem ela enquanto faz algo que importa.",
    reflectionPrompt:
      "Que sensação aparece quando você tira a anestesia do caminho?",
    closingPhrase:
      "O desconforto não é o inimigo. É a fronteira onde a fuga costumava te buscar.",
  },
  {
    day: 9,
    title: "Reduza a dependência de motivação",
    diagnosis:
      "Motivação é um clima, não um contrato. Quem só age motivado entrega o comando da própria vida ao humor do dia.",
    action:
      "Crie uma regra mínima inegociável para hoje e cumpra sem consultar a vontade.",
    reflectionPrompt:
      "Como seria sua vida se a vontade perdesse o direito de veto?",
    closingPhrase:
      "Você não precisa querer. Precisa decidir uma vez e não reabrir a votação.",
  },
  {
    day: 10,
    title: "Tolere ser visto",
    diagnosis:
      "Parte do medo não é falhar — é falhar diante de alguém. A invisibilidade parece segura porque ninguém confirma o erro.",
    action:
      "Torne público um pedaço pequeno do seu processo: mostre, envie, pergunte ou publique algo imperfeito.",
    reflectionPrompt:
      "Quanto do que você temeu que pensassem era memória antiga, e não fato presente?",
    closingPhrase:
      "Ser visto não cria a vulnerabilidade. Apenas revela a que sempre existiu.",
  },
  {
    day: 11,
    title: "Reescreva a narrativa interna",
    diagnosis:
      "Você repete há anos uma frase sobre si: \"eu sou assim\", \"eu travo\", \"eu não termino\". A frase virou rota automática.",
    action:
      "Escreva a frase que você usa contra si e, ao lado, uma versão mais precisa e menos sentenciosa. Aja a partir da segunda.",
    reflectionPrompt:
      "Quem te ensinou a primeira frase, e por que você ainda a obedece?",
    closingPhrase:
      "Você não é a frase que decorou sobre si. É quem está revisando o texto.",
  },
  {
    day: 12,
    title: "Aja antes da certeza",
    diagnosis:
      "A incerteza pede mais um dado, mais um preparo, mais uma garantia. Esse \"mais um\" é a fuga vestida de prudência.",
    action:
      "Tome uma decisão pequena hoje sem ter todas as respostas. Escolha, registre e siga.",
    reflectionPrompt:
      "Qual garantia você estava esperando, e ela algum dia chega de verdade?",
    closingPhrase:
      "Clareza costuma vir depois do movimento, não antes. Você age para enxergar.",
  },
  {
    day: 13,
    title: "Integre, sem comemorar cedo",
    diagnosis:
      "Perto do fim, surge a tentação de relaxar ou de inflar o resultado. Os dois sabotam: um abandona, o outro mente.",
    action:
      "Liste com honestidade o que mudou e o que ainda não mudou. Faça uma ação que cuide do que ainda não mudou.",
    reflectionPrompt:
      "O que você está pronto para manter mesmo quando esta jornada acabar?",
    closingPhrase:
      "Evolução real é discreta. Aparece no que você passou a fazer sem precisar se convencer.",
  },
  {
    day: 14,
    title: "Reconstrua a decisão",
    diagnosis:
      "Duas semanas não apagam um medo antigo. Mas provam que você consegue agir sem pedir licença a ele repetidas vezes.",
    action:
      "Conclua uma pendência que mantinha sua vida pequena, ou repita a ação que mais te custou — agora por escolha, não por prova.",
    reflectionPrompt:
      "O que você responde hoje quando o medo tenta decidir por você?",
    closingPhrase:
      "Coragem não é o fim do medo. É a quantidade de vezes que você não obedeceu, mesmo ouvindo a voz dele.",
  },
];

export const twentyOneDayChallenges: DailyChallenge[] = [
  ...openingChallenges,
  {
    day: 7,
    title: "Feche a primeira semana sem troféu",
    diagnosis:
      "A primeira semana termina e o medo aposta no alívio: \"já basta\". Fechar não é parar — é confirmar que você continua.",
    action:
      "Releia o objetivo que escreveu no início e faça uma ação que o honre, mesmo pequena.",
    reflectionPrompt:
      "O que o medo sussurrou agora que você chegou ao fim da primeira semana?",
    closingPhrase:
      "Terminar uma etapa não é permissão para recuar. É a base da próxima.",
  },
  {
    day: 8,
    title: "Encare o desconforto sem anestesia",
    diagnosis:
      "Você tem anestesias prediletas: a tela, a comida, a distração, o adiamento elegante. Elas tiram o desconforto e levam a ação junto.",
    action:
      "Nomeie a sua anestesia mais usada e passe 30 minutos sem ela enquanto faz algo que importa.",
    reflectionPrompt:
      "Que sensação aparece quando a anestesia sai do caminho?",
    closingPhrase:
      "O desconforto é a fronteira onde a fuga te buscava. Ficar nela já é resistir.",
  },
  {
    day: 9,
    title: "Reduza a dependência de motivação",
    diagnosis:
      "Motivação é clima, não contrato. Quem só age motivado entrega a própria vida ao humor do dia.",
    action:
      "Defina uma regra mínima inegociável para hoje e cumpra sem consultar a vontade.",
    reflectionPrompt:
      "Como seria sua vida se a vontade perdesse o direito de veto?",
    closingPhrase:
      "Você não precisa querer. Precisa decidir uma vez e não reabrir a votação.",
  },
  {
    day: 10,
    title: "Aja quando ninguém vê valor",
    diagnosis:
      "É fácil agir quando há plateia ou resultado imediato. O caráter da mudança se decide no esforço sem testemunha.",
    action:
      "Faça hoje a tarefa que ninguém vai elogiar e que, mesmo assim, te aproxima do objetivo.",
    reflectionPrompt:
      "Você age pela mudança ou pela imagem de quem está mudando?",
    closingPhrase:
      "O que se sustenta no silêncio é o que de fato te pertence.",
  },
  {
    day: 11,
    title: "Tolere ser visto",
    diagnosis:
      "Parte do medo não é falhar — é falhar diante de alguém. A invisibilidade parece segura porque ninguém confirma o erro.",
    action:
      "Torne público um pedaço pequeno do processo: mostre, envie, pergunte ou publique algo imperfeito.",
    reflectionPrompt:
      "Quanto do que você temeu que pensassem era memória antiga, e não fato de agora?",
    closingPhrase:
      "Ser visto não cria a vulnerabilidade. Só revela a que já existia.",
  },
  {
    day: 12,
    title: "Reescreva a narrativa interna",
    diagnosis:
      "Você repete há anos uma frase sobre si: \"eu sou assim\", \"eu travo\", \"eu não termino\". A frase virou rota automática.",
    action:
      "Escreva a frase que usa contra si e, ao lado, uma versão mais precisa e menos sentenciosa. Aja a partir da segunda.",
    reflectionPrompt:
      "Quem te ensinou a primeira frase, e por que ela ainda manda?",
    closingPhrase:
      "Você não é a frase que decorou. É quem está reescrevendo o texto.",
  },
  {
    day: 13,
    title: "Aja antes da certeza",
    diagnosis:
      "A incerteza pede mais um dado, mais um preparo, mais uma garantia. Esse \"mais um\" é a fuga vestida de prudência.",
    action:
      "Tome uma decisão pequena sem ter todas as respostas. Escolha, registre e siga.",
    reflectionPrompt:
      "Qual garantia você espera, e ela chega algum dia?",
    closingPhrase:
      "Clareza costuma vir depois do movimento. Você age para enxergar.",
  },
  {
    day: 14,
    title: "Sustente no meio do caminho",
    diagnosis:
      "O meio é onde projetos morrem. Longe da novidade do início e da emoção do fim, sobra só a decisão.",
    action:
      "Repita a ação central da jornada exatamente no dia em que ela parece mais sem graça.",
    reflectionPrompt:
      "O que te faz continuar quando não há nem empolgação nem linha de chegada à vista?",
    closingPhrase:
      "O meio não é para sentir. É para atravessar.",
  },
  {
    day: 15,
    title: "Desmonte a autossabotagem",
    diagnosis:
      "Quando você começa a ir bem, surge o impulso de estragar: atrasar, brigar, abandonar. O acerto ameaça uma identidade antiga de quem não conseguia.",
    action:
      "Antecipe a sua forma clássica de sabotar e faça o oposto exato hoje.",
    reflectionPrompt:
      "O que ficaria ameaçado em você se desta vez desse certo?",
    closingPhrase:
      "Às vezes o medo não teme o fracasso. Teme que você descubra do que é capaz.",
  },
  {
    day: 16,
    title: "Recupere sem dramatizar a falha",
    diagnosis:
      "Você vai falhar em algum dia desta jornada. O problema nunca foi cair — foi usar a queda como prova de que não adianta.",
    action:
      "Pegue algo em que você falhou recentemente e faça a versão corretiva, sem discurso e sem culpa.",
    reflectionPrompt:
      "Você trata o erro como informação ou como sentença?",
    closingPhrase:
      "Recomeçar rápido é o que separa quem muda de quem só se explica.",
  },
  {
    day: 17,
    title: "Estabeleça um limite",
    diagnosis:
      "Parte da sua fuga é dizer sim para tudo até não sobrar você. Sem limite, a agenda dos outros sempre vence a sua.",
    action:
      "Diga um não necessário hoje, ou proteja um bloco de tempo para o que importa para você.",
    reflectionPrompt:
      "De quem é a vida que você tem vivido na maior parte do dia?",
    closingPhrase:
      "Limite não é distância das pessoas. É presença na sua própria vida.",
  },
  {
    day: 18,
    title: "Aja pela versão futura",
    diagnosis:
      "Você costuma decidir a partir do alívio imediato. A pessoa que você quer ser nasce das escolhas feitas contra esse alívio.",
    action:
      "Faça hoje uma escolha que o \"você de daqui a um ano\" agradeceria, mesmo que o \"você de agora\" reclame.",
    reflectionPrompt:
      "O que a sua versão futura está cansada de esperar que você comece?",
    closingPhrase:
      "O futuro não é um lugar aonde você chega. É o acúmulo do que você repete agora.",
  },
  {
    day: 19,
    title: "Reduza o ruído",
    diagnosis:
      "Excesso de informação virou outra fuga: parece produtivo, mas adia a ação real. Consumir não é o mesmo que mudar.",
    action:
      "Corte uma fonte de ruído hoje — uma notificação, um feed, uma aba — e use o espaço para executar, não para planejar mais.",
    reflectionPrompt:
      "Quanto do seu dia é preparo para uma vida que você nunca começa a viver?",
    closingPhrase:
      "Clareza raramente vem de mais informação. Vem de menos negociação.",
  },
  {
    day: 20,
    title: "Integre o que mudou",
    diagnosis:
      "Perto do fim, o medo tenta dois extremos: inflar o resultado ou diminuir tudo. Os dois te tiram da verdade.",
    action:
      "Escreva com honestidade o que mudou e o que ainda não mudou, e faça uma ação que cuide do que falta.",
    reflectionPrompt:
      "Qual novo padrão você está pronto para manter sem precisar desta jornada?",
    closingPhrase:
      "Mudança real é discreta. Aparece no que você passou a fazer sem se convencer.",
  },
  {
    day: 21,
    title: "Reconstrua a decisão",
    diagnosis:
      "Vinte e um dias não eliminam um medo que levou anos para se formar. Mas provam, com evidência sua, que você pode agir sem a permissão dele.",
    action:
      "Conclua a pendência que mais manteve sua vida pequena, ou repita a ação que mais custou — agora por escolha, não por prova.",
    reflectionPrompt:
      "Quem decide a próxima ação da sua vida a partir de hoje?",
    closingPhrase:
      "Coragem não é ausência de medo. É o número de vezes que você ouviu a voz dele e seguiu mesmo assim.",
  },
];

const challengesByLength: Record<JourneyLength, DailyChallenge[]> = {
  7: sevenDayChallenges,
  14: fourteenDayChallenges,
  21: twentyOneDayChallenges,
};

export const getChallengesForLength = (length: JourneyLength): DailyChallenge[] =>
  challengesByLength[length];

export const getChallengeForDay = (
  length: JourneyLength,
  day: number,
): DailyChallenge | null =>
  getChallengesForLength(length).find((challenge) => challenge.day === day) ?? null;
