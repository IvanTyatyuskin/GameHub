import DiamantImg from "./diamant/Image.png"
import SkullImg from "./skull/Image.png"
import GameInfo from "./GameInfoClass.js"
import TicTacToeImg from "./tictactoe/image.jpg"

const diamantRules = [
    "Каждый игрок выставляет на основной планшет фишку своего цвета.",
    "Он берёт сундук для хранения своих богатств и две карты для голосования: «Иду дальше» и «Возвращаюсь в лагерь».",
    "Игра длится пять раундов, каждый раунд приключенцы исследуют новую пещеру.",
    "Один за одним случайно из общей колоды достается и выкладывается тайл. Тайлы бывают двух типов: тайлы с сокровищами и тайлы с ловушками.",
    "Если выходит тайл с сокровищами, то игроки равномерно распределяют эти сокровища, а остаток кладётся на сам тайл.",
    "Если выходит тайл с ловушкой, которая ещё не выходила в текущем раунде, ничего не происходит.",
    "Если выходит ловушка, на которую искатели сокровищ уже натыкались, они убегают, теряя все сокровища, накопленные за этот раунд.",
    "После выхода каждого тайла игроки начинают голосовать. Игрок может либо рискнуть и продолжить путешествие, чтобы «нахапать» побольше сокровищ, либо отправиться обратно в лагерь.",
    "Если несколько игроков отправляются обратно в лагерь, то они делят сокровища, оставленные до этого на предыдущих тайлах.",
    "Все игроки, кто добровольно вернулся в лагерь, кладут добытые богатства в свой сундук. Это их победные очки до конца игры, никто не может их отобрать.",
    "Как только все игроки вернулись в лагерь (добровольно или сбежав от опасности), тайлы замешиваются заново и начинается новый раунд.",
    "По окончании пятого раунда игроки считают победные очки. Набравший больше всех победных очков игрок побеждает."
];

const ticTacToeRules = [
    "Игроки выбирают символы: один игрок - 'X', другой - 'O'.",
    "Игроки по очереди ставят свои символы на свободные клетки 3x3 поля.",
    "Первый игрок, который разместит три своих символа в ряд (по горизонтали, вертикали или диагонали), выигрывает.",
    "Если все девять клеток заполнены и ни один игрок не имеет три символа в ряд, игра заканчивается вничью."
];

export const Games = [
    new GameInfo(
        "Diamant",
        "«Диамант» — это простая и увлекательная настольная игра, в которой игрокам предстоит исследовать пещеры, собирать сокровища и реликвии, а также избегать ловушек.",
        DiamantImg,
        "lobbyListDiamant",
        [diamantRules],
        6, 2, 20),

    new GameInfo(
        "Skull",
        "Ловушка с черепами. Настольная игра Череп (Skull) – гремучее сочетание блефа, стремительного игрового процесса и байкерских татуировок, которые подарили игре неподражаемое оформление.",
        SkullImg,
        "lobbyListSkull",
        [
            "Ловушка с черепами. Настольная игра Череп (Skull) – гремучее сочетание блефа, стремительного игрового процесса и байкерских татуировок, которые подарили игре неподражаемое оформление.",
            "Класть или вскрывать? В распоряжении каждого из игроков в игре Череп есть подставка и четыре круглых жетона, на трёх из которых изображены цветы, а на оставшемся – череп. Каждый ход участник может положить на стол лицом вниз любой из жетонов или назвать число жетонов, которые он готов вскрыть, не наткнувшись на череп. Соперники могут спасовать или назвать большее число жетонов.",
            "Останется только один! Когда все соперники спасовали, оставшийся игрок начинает вскрывать жетоны, стараясь избежать встречи с черепом. Если ему улыбнётся удача – он уже на полпути к победе – ещё один удачный раунд, и победа за ним. Но если среди цветов отыщется череп – участник до конца игры лишается одного из своих жетонов. Если в ходе игры вы потеряете все жетоны, то автоматически проиграете."
        ],
        12, 2, 100),
    new GameInfo(
        "Крестики-нолики",
        "Крестики-нолики» — это классическая настольная игра для двух игроков, в которой игроки по очереди ставят 'X' и 'O' на поле 3x3.",
        TicTacToeImg,
        "lobbyListTicTacToe",
        ticTacToeRules,
        2, 2, 2
    )
]

