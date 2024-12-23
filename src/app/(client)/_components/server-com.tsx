import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FAQItem,
  TGuide,
  THeroContent,
  TTestimonials,
} from "@/lib/database";
import BodyAdScript, { DownloaderForm } from "./client-com";
import { TypographyH2 } from "@/components/ui/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  content: THeroContent;
  bannerAd_300_250: string;
  longBannerAd_468_60: string;
}

export function Hero({
  content,
  bannerAd_300_250,
  longBannerAd_468_60,
}: Props) {
  return (
    <Card className="w-full py-11 my-11">
      <CardHeader>
        <CardTitle className="text-primary text-center text-2xl lg:text-4xl font-bold">
          {content.title}
        </CardTitle>
        <br />
        <CardDescription>{content.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <BodyAdScript
          bannerAd_300_250={bannerAd_300_250}
          longBannerAd_468_60={longBannerAd_468_60}
        />
        <DownloaderForm />
      </CardContent>
    </Card>
  );
}

export const NonBodyAsScript = ({ script }: { script: string | undefined }) => {
  return (
    <>{script && <div dangerouslySetInnerHTML={{ __html: script }}></div>}</>
  );
};

export function Guide({ guides }: { guides: TGuide[] }) {
  return (
    <>
      <div className="my-11">
        <TypographyH2 className="text-3xl font-bold text-center my-8 text-primary">
          How to use
        </TypographyH2>
        <div className="flex justify-between items-center gap-5 flex-wrap md:flex-nowrap">
          {guides?.length > 0 &&
            guides.map((guide, i) => {
              return (
                <Card key={i} className="grow">
                  <CardHeader>
                    <div className="bg-primary/30 text-primary size-14 rounded-full flex items-center justify-center mb-4">
                      <span className="text-3xl font-bold select-none">
                        {i + 1}
                      </span>
                    </div>
                    <CardTitle>{guide?.title}</CardTitle>
                  </CardHeader>
                  <CardContent>{guide?.desc}</CardContent>
                </Card>
              );
            })}
        </div>
      </div>
    </>
  );
}

export function Content({ htmlContent }: { htmlContent: string }) {
  return (
    <>
      <div className="my-11">
        <TypographyH2 className="text-3xl font-bold text-center text-primary">
          Comprehensive Guide to Using Our Social Media Video Downloader
        </TypographyH2>
        {htmlContent && (
          <Card className="p-0">
            <CardContent className="mt-5 p-0">
              <div
                className="tiptap"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}

export function Testimonial({
  testimonials,
}: {
  testimonials: TTestimonials[];
}) {
  return (
    <>
      <div className="my-11">
        <TypographyH2 className="text-3xl font-bold text-center my-8 text-primary">
          Testimonials
        </TypographyH2>
        <div className="flex justify-between items-start gap-5 flex-wrap md:flex-nowrap">
          {testimonials.length > 0 &&
            testimonials.map((testimonial, i) => {
              return (
                <Card key={i} className="grow">
                  <CardHeader>
                    <div className="bg-primary/30 text-primary size-11 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold select-none">
                        {testimonial?.name.slice(0, 1)}
                      </span>
                    </div>
                    <CardTitle>{testimonial?.name}</CardTitle>
                  </CardHeader>
                  <CardContent>{testimonial?.cont}</CardContent>
                </Card>
              );
            })}
        </div>
      </div>
    </>
  );
}

export function Faq({ faqs }: { faqs: FAQItem[] }) {
  return (
    <>
      <div className="my-11">
        <TypographyH2 className="text-3xl font-bold text-center text-primary">
          {`Frequently asked question(s)`}
        </TypographyH2>
        <Card>
          <CardContent className="my-4">
            <Accordion type="single" collapsible className="w-full">
              {faqs.length > 0 &&
                faqs.map((faq, i) => {
                  return (
                    <AccordionItem value={JSON.stringify(i)} key={i}>
                      <AccordionTrigger className="text-start">
                        {faq?.question}
                      </AccordionTrigger>
                      <AccordionContent>{faq?.answer}</AccordionContent>
                    </AccordionItem>
                  );
                })}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
