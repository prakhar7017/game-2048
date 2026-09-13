type ScoreboardProps = {
    score: number,
    best: number,
}

export function Scoreboard({ score, best }:ScoreboardProps) {
    return (
        <div className="scoreboard">
            <div className="score-box">
                <span className="score-label">Best</span>
                <span className="score-value">{best}</span>
            </div>
            <div className="score-box">
                <span className="score-label">Score</span>
                <span className="score-value">{score}</span>
            </div>
        </div>
    )
}