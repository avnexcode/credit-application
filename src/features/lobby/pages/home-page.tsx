import { PageContainer, SectionContainer } from "@/components/layouts";

export const HomePage = () => {
  return (
    <PageContainer withHeader withFooter title="JASIK">
      <SectionContainer padded>
        <main className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-[#2e026d] to-[#15162c]">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              Hello <span className="text-[hsl(280,100%,70%)]">World</span> App
            </h1>

            <p className="text-2xl text-white">Jembuat</p>
          </div>
        </main>
      </SectionContainer>
    </PageContainer>
  );
};
