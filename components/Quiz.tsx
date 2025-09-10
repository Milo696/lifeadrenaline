"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'

type Persona = 'Adrenaline' | 'Success' | 'Entertainment'

type Result = {
  type: Persona
  blurb: string
  categorySlug: string
}

type Option = {
  label: string
  weights: { adrenaline: number; success: number; entertainment: number }
}

type Question = { text: string; options: Option[] }

// Vector scoring: sum weights across axes and choose the max
const QUESTIONS: Question[] = [
  {
    text: 'Pick your dream getaway',
    options: [
      { label: 'Skydiving', weights: { adrenaline: 3, success: 0, entertainment: 0 } },
      { label: 'Boutique hotel & spa', weights: { adrenaline: 0, success: 2, entertainment: 0 } },
      { label: 'Movie marathon', weights: { adrenaline: 0, success: 0, entertainment: 2 } },
    ],
  },
  {
    text: 'Your approach to risk',
    options: [
      { label: 'Head-on', weights: { adrenaline: 3, success: 1, entertainment: 0 } },
      { label: 'Calculated', weights: { adrenaline: 1, success: 2, entertainment: 0 } },
      { label: 'Avoid risk', weights: { adrenaline: 0, success: 1, entertainment: 1 } },
    ],
  },
  {
    text: 'What motivates you most?',
    options: [
      { label: 'Winning', weights: { adrenaline: 2, success: 2, entertainment: 0 } },
      { label: 'Money', weights: { adrenaline: 0, success: 3, entertainment: 0 } },
      { label: 'Fun', weights: { adrenaline: 0, success: 0, entertainment: 3 } },
    ],
  },
  {
    text: 'Content preference',
    options: [
      { label: 'Extreme vlogs', weights: { adrenaline: 3, success: 0, entertainment: 1 } },
      { label: 'Business/Productivity', weights: { adrenaline: 0, success: 3, entertainment: 0 } },
      { label: 'Entertainment/Gaming', weights: { adrenaline: 1, success: 0, entertainment: 3 } },
    ],
  },
  {
    text: 'Your weekend vibe',
    options: [
      { label: 'Trips/Adventures', weights: { adrenaline: 3, success: 1, entertainment: 0 } },
      { label: 'Goal planning', weights: { adrenaline: 0, success: 3, entertainment: 0 } },
      { label: 'Chill with friends', weights: { adrenaline: 0, success: 0, entertainment: 3 } },
    ],
  },
]

function decidePerson(answers: number[]): Result {
  const totals = { adrenaline: 0, success: 0, entertainment: 0 }
  answers.forEach((optIndex, qi) => {
    const w = QUESTIONS[qi].options[optIndex].weights
    totals.adrenaline += w.adrenaline
    totals.success += w.success
    totals.entertainment += w.entertainment
  })
  const entries: Array<[Persona, number]> = [
    ['Adrenaline', totals.adrenaline],
    ['Success', totals.success],
    ['Entertainment', totals.entertainment],
  ]
  entries.sort((a, b) => b[1] - a[1])
  const winner = entries[0][0]
  switch (winner) {
    case 'Adrenaline':
      return { type: 'Adrenaline', blurb: 'You’re a thrill seeker. On to the adventures!', categorySlug: 'adrenaline' }
    case 'Success':
      return { type: 'Success', blurb: 'You’re a strategist focused on results and growth.', categorySlug: 'success-tips' }
    default:
      return { type: 'Entertainment', blurb: 'You’re here for light fun and vivid vibes.', categorySlug: 'entertainment' }
  }
}

export default function Quiz() {
  const [answers, setAnswers] = useState<number[]>(Array(QUESTIONS.length).fill(-1))
  const [result, setResult] = useState<Result | null>(null)

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('quiz_result') : null
    if (saved) setResult(JSON.parse(saved))
  }, [])

  const allAnswered = answers.every((i) => i >= 0)

  return (
    <div className="rounded-lg border p-4">
      <h3 className="text-lg font-semibold mb-2">What’s your adrenaline type?</h3>
      {result ? (
        <div>
          <p className="mb-3">{result.blurb}</p>
          <div className="flex gap-3">
            <Link href={`/blog?category=${result.categorySlug}`} className="btn-gradient px-4 py-2 text-sm rounded">See recommendations</Link>
            <button
              onClick={() => { setResult(null); localStorage.removeItem('quiz_result') }}
              className="rounded border px-4 py-2 text-sm"
            >
              Retake
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {QUESTIONS.map((q, qi) => (
            <div key={qi}>
              <p className="font-medium">{q.text}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {q.options.map((opt, oi) => (
                  <button
                    key={oi}
                    onClick={() => {
                      const next = [...answers]
                      next[qi] = oi
                      setAnswers(next)
                    }}
                    className={`rounded border px-3 py-1 ${answers[qi] === oi ? 'bg-white/10 border-[#D4AF37]' : ''}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button
            className="btn-gradient rounded px-4 py-2 text-sm disabled:opacity-50"
            disabled={!allAnswered}
            onClick={() => {
              const res = decidePerson(answers)
              setResult(res)
              try { localStorage.setItem('quiz_result', JSON.stringify(res)) } catch {}
            }}
          >
            Show result
          </button>
        </div>
      )}
    </div>
  )
}


