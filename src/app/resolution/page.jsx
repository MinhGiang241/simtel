'use client'
import React, { useEffect, useState } from 'react'
import PageWrapper from '../components/pageWrapper'
import { useSearchParams } from 'next/navigation'
import { get_article } from '../../services/api/detailFooter'
import parse from 'html-react-parser';


export default function Resolution() {
    const [article, setArticle] = useState('')

    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    useEffect(() => {
        get_article(id).then((v) => {
            console.log("article", v);
            setArticle(v)
        })
    }, [id])

    return (
        <PageWrapper>
            <div className='mt-5 px-2'>
                <div>
                    {parse(article?.content ?? '')}
                </div>
            </div>
        </PageWrapper>
    )
}