import React from 'react'

export default async function Home() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return (
    <div>Home</div>
  )
}
