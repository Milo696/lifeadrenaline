"use client"
import { useState } from 'react'
import Link from 'next/link'

type Result = {
  type: 'Adrenaline' | 'Success' | 'Entertainment'
  blurb: string
  categorySlug: string
}

export default function Quiz() {
  const [answers, setAnswers] = useState<number[]>([])
  const [result, setResult] = useState<Result | null>(null)

  const questions = [
    'Выберите отдых мечты?',
    'Ваше отношение к риску?',
    'Что мотивирует больше всего?'
  ]
  const options = [
    ['Скайдайвинг', 'Пляж', 'Кино-марафон'],
    ['Люблю риск', 'Считаю', 'Избегаю'],
    ['Победы', 'Деньги', 'Развлечение']
  ]

  function compute(answersLocal: number[]): Result {
    const score = answersLocal.reduce((a, b) => a + b, 0)
    if (score <= 2) return { type: 'Adrenaline', blurb: 'Ты охотник за острыми ощущениями!', categorySlug: 'adrenaline' }
    if (score <= 4) return { type: 'Success', blurb: 'Ты стратег и стремишься к успеху.', categorySlug: 'success-tips' }
    return { type: 'Entertainment', blurb: 'Ты за легкий фановый вайб.', categorySlug: 'entertainment' }
  }

  return (
    <div className="rounded-lg border p-4">
      <h3 className="text-lg font-semibold mb-2">Какой твой тип адреналина?</h3>
      {result ? (
        <div>
          <p className="mb-3">{result.blurb}</p>
          <Link href={`/blog?category=${result.categorySlug}`} className="inline-block rounded bg-brand-600 px-4 py-2 text-white">Смотреть рекомендации</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((q, qi) => (
            <div key={qi}>
              <p className="font-medium">{q}</p>
              <div className="mt-2 flex gap-2">
                {options[qi].map((opt, oi) => (
                  <button
                    key={oi}
                    onClick={() => {
                      const next = [...answers]
                      next[qi] = oi
                      setAnswers(next)
                    }}
                    className={`rounded border px-3 py-1 ${answers[qi] === oi ? 'bg-brand-100 border-brand-400' : ''}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button
            className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
            disabled={answers.length !== questions.length || answers.includes(undefined as unknown as number)}
            onClick={() => setResult(compute(answers))}
          >
            Результат
          </button>
        </div>
      )}
    </div>
  )
}


