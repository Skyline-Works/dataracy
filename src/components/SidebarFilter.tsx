'use client'

import { useState, useEffect, Suspense } from 'react'
import { ChevronDown, ChevronUp, Filter, Check } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

type FilterCategory = {
    id: string
    label: string
    options: string[]
}

const FILTERS: FilterCategory[] = [
    {
        id: 'topic',
        label: '분석 주제',
        options: ['사회/문화', '경제/금융', '환경/ESG', '교통/물류', '헬스케어', '부동산']
    },
    {
        id: 'tech',
        label: '기술 스택',
        options: ['Python', 'R', 'SQL', 'JavaScript', 'TypeScript']
    },
    {
        id: 'tool',
        label: '분석 도구',
        options: ['Tableau', 'PowerBI', 'Excel', 'Pandas', 'Scikit-learn']
    },
    {
        id: 'level',
        label: '난이도',
        options: ['초급', '중급', '고급', '전문가']
    }
]

function FilterContent() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        topic: true,
        tech: true,
        tool: false,
        level: false
    })

    const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set())

    // Initialize from URL
    useEffect(() => {
        const tags = searchParams.get('tags')
        if (tags) {
            setSelectedFilters(new Set(tags.split(',')))
        } else {
            setSelectedFilters(new Set())
        }
    }, [searchParams])

    const toggleSection = (id: string) => {
        setOpenSections(prev => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    const toggleFilter = (option: string) => {
        const newFilters = new Set(selectedFilters)
        if (newFilters.has(option)) {
            newFilters.delete(option)
        } else {
            newFilters.add(option)
        }

        applyFilters(newFilters)
    }

    const applyFilters = (filters: Set<string>) => {
        const params = new URLSearchParams(searchParams.toString())
        if (filters.size > 0) {
            params.set('tags', Array.from(filters).join(','))
        } else {
            params.delete('tags')
        }
        router.push(`?${params.toString()}`, { scroll: false })
    }

    const clearFilters = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete('tags')
        router.push(`?${params.toString()}`, { scroll: false })
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider px-2 py-2">
                <Filter className="w-3 h-3" /> 필터 검색
            </div>

            <div className="glass-card rounded-2xl overflow-hidden p-2">
                {FILTERS.map((section) => (
                    <div key={section.id} className="border-b border-white/5 last:border-0">
                        <button
                            onClick={() => toggleSection(section.id)}
                            className="w-full flex items-center justify-between p-3 text-sm font-bold text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                            {section.label}
                            {openSections[section.id] ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                        </button>

                        {openSections[section.id] && (
                            <div className="px-3 pb-3 pt-1 space-y-2 animate-in slide-in-from-top-2 duration-200">
                                {section.options.map((option) => {
                                    const isSelected = selectedFilters.has(option)
                                    return (
                                        <div
                                            key={option}
                                            onClick={() => toggleFilter(option)}
                                            className={`flex items-center gap-3 cursor-pointer group p-1.5 rounded-lg hover:bg-white/5 transition-colors ${isSelected ? 'bg-blue-500/10' : ''}`}
                                        >
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-slate-600 group-hover:border-slate-400 bg-transparent'}`}>
                                                {isSelected && <Check className="w-3 h-3 text-white" />}
                                            </div>
                                            <span className={`text-sm ${isSelected ? 'text-blue-200 font-bold' : 'text-slate-400 group-hover:text-slate-200'}`}>
                                                {option}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {selectedFilters.size > 0 && (
                <div className="px-2">
                    <button
                        onClick={clearFilters}
                        className="text-xs text-slate-500 hover:text-red-400 underline underline-offset-4 decoration-slate-700 transition-colors"
                    >
                        필터 초기화
                    </button>
                </div>
            )}
        </div>
    )
}

export default function SidebarFilter() {
    return (
        <Suspense fallback={<div className="text-slate-500 text-sm p-4">필터 로딩중...</div>}>
            <FilterContent />
        </Suspense>
    )
}
