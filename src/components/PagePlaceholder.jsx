import Container from "./layout/Container";

export default function PagePlaceholder({ title, description }) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {description}
          </p>
        </div>
      </Container>
    </section>
  );
}
