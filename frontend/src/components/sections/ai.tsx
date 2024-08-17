import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import generateChatResponse from "@/lib/openai/chat";
import { useAccount } from "wagmi";
import { forma } from "viem/chains";
import { ReactTyped } from "react-typed";
import LoadingDots from "@/components/ui/loading-dots";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Convo {
  id: string;
  isAI: boolean;
  message: string;
}
export default function AIComponent() {
  const [convos, setConvos] = useState<Convo[]>([
    {
      id: "1",
      isAI: true,
      message: "Hello Degen, how can I help you today?",
    },
  ]);
  const [prompt, setPrompt] = useState<string>("");
  const { status } = useAccount();
  return (
    <Card className="h-full pt-6">
      <CardContent className="flex flex-col h-full">
        <ScrollArea className="h-[90%] flex flex-col space-y-2">
          {convos.map((convo) => (
            <div
              key={convo.id}
              className={`flex text-xs ${
                convo.isAI ? "justify-start" : "justify-end"
              } items-center space-x-2`}
            >
              {convo.isAI && (
                <Avatar className="h-9 w-9 border-[2px] border-primary">
                  <AvatarImage src={"/logo.png"} alt="Avatar" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
              )}
              <Card className="max-w-[70%]">
                <CardContent className="py-2 px-3">
                  {convo.isAI ? (
                    <ReactTyped
                      strings={[convo.message]}
                      typeSpeed={15}
                      showCursor={false}
                      onStop={() => {}}
                    />
                  ) : (
                    <p className="">{convo.message}</p>
                  )}
                </CardContent>
              </Card>
              {!convo.isAI && (
                <Avatar className="h-9 w-9 border-[2px] border-primary">
                  <AvatarImage src={"/coins/usdt.png"} alt="Avatar" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {!convos[convos.length - 1].isAI && (
            <div
              key={convos.length}
              className={`flex text-sm justify-start items-center space-x-2`}
            >
              <Avatar className="h-9 w-9 border-[2px] border-primary">
                <AvatarImage src={"/logo.png"} alt="Avatar" className="" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <Card className="max-w-[70%]">
                <CardContent className="py-3">
                  <LoadingDots />
                </CardContent>
              </Card>
            </div>
          )}
        </ScrollArea>
        <Separator className="" />
        <div className="flex mx-auto py-2 w-[75%]">
          <Input
            type="text"
            disabled={false}
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            placeholder="Enter your prompt"
            className="sticky top-0 z-50  border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          />
          <Button
            className="ml-2"
            disabled={false}
            onClick={async () => {
              const currentConvo = {
                id: (convos.length + 1).toString(),
                isAI: false,
                message: prompt,
              };
              setConvos([...convos, currentConvo]);
              await generateChatResponse({
                input: prompt,
                setConvo: (response) =>
                  setConvos([
                    ...convos,
                    currentConvo,
                    {
                      id: (convos.length + 1).toString(),
                      isAI: true,
                      message: response,
                    },
                  ]),
              });
              setPrompt("");
            }}
          >
            <Icons.rightArrow className="h-3 w-3 fill-current" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
