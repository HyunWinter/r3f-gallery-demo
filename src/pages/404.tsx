import Curve from '~/components/curve/Curve'
import HeroEmpty from '~/components/hero/hero-empty/HeroEmpty'

export default function Custom404() {
  return (
    <section className="max-w-section w-full mx-auto desktop:px-[5rem] px-6 pb-header min-h-[calc(100svh)] flex flex-col items-center justify-center text-white">
      <h1 className="text-9xl">404</h1>
      <h5 className="text-5xl">Page not found.</h5>
    </section>
  )
}
