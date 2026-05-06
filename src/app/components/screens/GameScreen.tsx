import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { getCategoryById, getLevelById } from "../../data/gameData";
import { useGame } from "../../context/GameContext";
import { LifeHearts } from "../LifeHearts";

export function GameScreen() {
  const navigate = useNavigate();
  const { categoryId, levelId } = useParams<{ categoryId: string; levelId: string }>();
  const { state, answerCorrect, answerWrong, nextQuestion, completeLevel, startGame, levelFailed } = useGame();

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const category = categoryId ? getCategoryById(categoryId) : null;
  const level = categoryId && levelId ? getLevelById(categoryId, parseInt(levelId)) : null;

  // Init game if no current game
  useEffect(() => {
    if (!state.currentGame && category && level) {
      startGame(category.id, level.id);
    }
  }, []);

  if (!category || !level) {
    return (
      <div className="flex items-center justify-center h-full">
        <p style={{ fontFamily: "Nunito, sans-serif", color: "#8EABC9" }}>Error cargando el juego</p>
      </div>
    );
  }

  const questionIndex = state.currentGame?.questionIndex ?? 0;
  const currentQuestion = level.questions[questionIndex];
  const currentScore = state.currentGame?.score ?? 0;
  const totalQ = level.questions.length;
  const progress = (questionIndex / totalQ) * 100;

  if (!currentQuestion) {
    return null;
  }

  const shuffledIndices = useMemo(() => {
    if (!currentQuestion) return [];
    const indices = currentQuestion.options.map((_, i) => i);
    // Fisher-Yates shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  }, [currentQuestion]);

  const handleOptionPress = (optionIndex: number) => {
    if (answered) return;

    setSelectedOption(optionIndex);
    setAnswered(true);

    const isCorrect = optionIndex === currentQuestion.correctIndex;

    setTimeout(() => {
      if (isCorrect) {
        answerCorrect(level.pointsPerQuestion);
        const isLast = questionIndex >= totalQ - 1;
        if (isLast) {
          // Complete level after a brief delay
          setTimeout(() => {
            const finalScore = currentScore + level.pointsPerQuestion;
            const correctAnswers = (state.currentGame?.correctAnswers ?? 0) + 1;
            const stars =
              correctAnswers === totalQ
                ? 3
                : correctAnswers >= Math.ceil(totalQ * 0.7)
                ? 2
                : 1;

            completeLevel({
              categoryId: category.id,
              levelId: level.id,
              completed: true,
              stars,
              points: finalScore,
              correctAnswers,
              totalQuestions: totalQ,
            });

            navigate("/level-complete", {
              state: {
                categoryId: category.id,
                levelId: level.id,
                points: finalScore,
                correctAnswers,
                totalQuestions: totalQ,
                stars,
                categoryColor: category.colorFrom,
                categoryEmoji: category.emoji,
                categoryName: category.name,
              },
            });
          }, 400);
        } else {
          navigate("/correct", {
            state: {
              points: level.pointsPerQuestion,
              totalScore: currentScore + level.pointsPerQuestion,
              lives: state.currentGame?.localLives ?? 3,
              categoryId: category.id,
              levelId: level.id,
              categoryColor: category.colorFrom,
            },
          });
        }
      } else {
        answerWrong();
        const newLocalLives = (state.currentGame?.localLives ?? 1) - 1;
        if (newLocalLives <= 0) {
          // Perdió todas las vidas locales → resta 1 vida global
          levelFailed();
          setTimeout(() => {
            navigate("/game-over", {
              state: {
                categoryId: category.id,
                levelId: level.id,
                score: currentScore,
                categoryColor: category.colorFrom,
                categoryName: category.name,
              },
            });
          }, 500);
        } else {
          navigate("/incorrect", {
            state: {
              correctIndex: currentQuestion.correctIndex,
              correctAnswer: currentQuestion.options[currentQuestion.correctIndex],
              lives: newLocalLives,
              categoryId: category.id,
              levelId: level.id,
              categoryColor: category.colorFrom,
              isLast: questionIndex >= totalQ - 1,
              currentScore,
              correctAnswers: state.currentGame?.correctAnswers ?? 0,
              totalQ,
              categoryEmoji: category.emoji,
              categoryName: category.name,
            },
          });
        }
      }
    }, 700);
  };

  const getOptionStyle = (index: number) => {
    if (!answered || selectedOption === null) {
      return {
        background: "#FFFFFF",
        border: "2px solid #E2EAF4",
        color: "#1E3A5F",
      };
    }
    const isCorrect = index === currentQuestion.correctIndex;
    const isSelected = index === selectedOption;

    if (isCorrect) {
      return {
        background: "#E8F7F0",
        border: "2px solid #5BB89A",
        color: "#2A7A5A",
      };
    }
    if (isSelected && !isCorrect) {
      return {
        background: "#FEF0EE",
        border: "2px solid #E87D5A",
        color: "#C4502A",
      };
    }
    return {
      background: "#F8FAFD",
      border: "2px solid #E2EAF4",
      color: "#8EABC9",
    };
  };

  const optionLetters = ["A", "B", "C", "D"];

  return (
    <div className="flex flex-col min-h-full" style={{ background: "#EEF4FB" }}>
      {/* Top Bar */}
      <div
        className="px-5 pt-3 pb-4"
        style={{
          background: `linear-gradient(165deg, ${category.colorFrom}, ${category.colorTo})`,
          borderBottomLeftRadius: "24px",
          borderBottomRightRadius: "24px",
        }}
      >
        {/* Top row */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => navigate(`/levels/${category.id}`)}
            style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "10px", padding: "6px", cursor: "pointer" }}
          >
            <X size={16} color="white" />
          </button>

          <div className="flex flex-col items-center">
            <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.75)" }}>
              {category.emoji} {category.name}
            </p>
            <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "13px", color: "white" }}>
              Nivel {level.id} — {level.title}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <div
              className="px-3 py-1.5 flex items-center gap-1"
              style={{ background: "rgba(255,215,0,0.25)", borderRadius: "10px" }}
            >
              <span style={{ fontSize: "13px" }}>⭐</span>
              <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "14px", color: "#FFD700" }}>
                {currentScore}
              </span>
            </div>
          </div>
        </div>

        {/* Lives + question counter */}
        <div className="flex items-center justify-between">
          <LifeHearts lives={state.currentGame?.localLives ?? 3} size={20} />
          <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "13px", color: "rgba(255,255,255,0.9)" }}>
            Pregunta {questionIndex + 1} de {totalQ}
          </p>
        </div>

        {/* Progress bar */}
        <div
          className="mt-3"
          style={{ height: "6px", background: "rgba(255,255,255,0.25)", borderRadius: "3px", overflow: "hidden" }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            style={{ height: "100%", background: "#FFFFFF", borderRadius: "3px" }}
          />
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 px-5 py-5 flex flex-col gap-5">
        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={questionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="p-5"
            style={{
              background: "#FFFFFF",
              borderRadius: "22px",
              boxShadow: "0 4px 18px rgba(74,127,212,0.1)",
              border: "1px solid rgba(74,127,212,0.08)",
              minHeight: "120px",
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "10px",
                  background: `${category.colorFrom}20`,
                }}
              >
                <span style={{ fontSize: "16px" }}>🙏</span>
              </div>
              <p
                style={{
                  fontFamily: "Lora, serif",
                  fontSize: "16px",
                  color: "#1E3A5F",
                  lineHeight: 1.6,
                  flex: 1,
                }}
              >
                {currentQuestion.text}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Answer Options */}
        <div className="flex flex-col gap-3">
          {shuffledIndices.map((originalIndex, displayIndex) => {
            const option = currentQuestion.options[originalIndex];
            const optStyle = getOptionStyle(originalIndex);
            return (
              <motion.button
                key={`${questionIndex}-${originalIndex}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: displayIndex * 0.07 }}
                whileTap={!answered ? { scale: 0.98 } : {}}
                onClick={() => handleOptionPress(originalIndex)}
                className="flex items-center gap-4 px-4 py-4 w-full"
                style={{
                  background: optStyle.background,
                  border: optStyle.border,
                  borderRadius: "16px",
                  cursor: answered ? "default" : "pointer",
                  transition: "all 0.25s ease",
                  boxShadow: "0 2px 8px rgba(74,127,212,0.06)",
                  textAlign: "left",
                }}
              >
                {/* Letter badge */}
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "10px",
                    background:
                      answered && originalIndex === currentQuestion.correctIndex
                        ? "#5BB89A"
                        : answered && originalIndex === selectedOption && originalIndex !== currentQuestion.correctIndex
                        ? "#E87D5A"
                        : `${category.colorFrom}18`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: 800,
                      fontSize: "14px",
                      color:
                        answered && (originalIndex === currentQuestion.correctIndex || originalIndex === selectedOption)
                          ? "#FFFFFF"
                          : category.colorFrom,
                    }}
                  >
                    {answered && originalIndex === currentQuestion.correctIndex
                      ? "✓"
                      : answered && originalIndex === selectedOption && originalIndex !== currentQuestion.correctIndex
                      ? "✗"
                      : optionLetters[displayIndex]}
                  </span>
                </div>

                <span
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    color: optStyle.color,
                    flex: 1,
                    lineHeight: 1.4,
                  }}
                >
                  {option}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Hint text */}
        {!answered && (
          <p
            className="text-center"
            style={{
              fontFamily: "Nunito, sans-serif",
              fontSize: "12px",
              color: "#A0B5CC",
            }}
          >
            Toca una opción para responder
          </p>
        )}
      </div>
    </div>
  );
}