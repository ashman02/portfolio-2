import Link from 'next/link'
import React from 'react'
import Button from '../Button'

const Hero = () => {
  return (
    <section className='my-container h-screen min-h-[600px] flex flex-col justify-between'>
        <h1 className='hero-heading'>Turn Your Website Into Your Best Sales Employee</h1>
        <Link href={"#"}>
            <Button name='Get Your Dream Website Today' />
        </Link>
    </section>
  )
}

export default Hero