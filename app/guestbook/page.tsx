/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Form } from "../components/Form";
import prisma from "../lib/db";
import { Suspense } from "react";
import {
  GuestBookFormLoading,
  LoadingMessages,
} from "../components/LoadingState";
import { unstable_noStore as noStore } from "next/cache";

async function getGuestBrookEntry() {
  noStore();
  const data = await prisma.guestBookEntry.findMany({
    select: {
      User: {
        select: {
          firstname: true,
          profileimage: true,
        },
      },
      message: true,
      id: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 30,
  });

  return data;
}

export default function GuestbookPage() {
  return (
    <section className="max-w-7xl w-full px-4 md:px-8 mx-auto">
      <h1 className="text-4xl font-semibold lg:text-5xl pt-5">Guestbook</h1>
      <p className="leading-7 text-muted-foreground mt-2">Sign my Guestbook!</p>

      <Card className="mt-10">
        <CardHeader className="flex flex-col w-full">
          <Label className="mb-1">Message</Label>
          <Suspense fallback={<GuestBookFormLoading />}>
            <GuestBookForm />
          </Suspense>

          <ul className="pt-7 gap-y-5 flex flex-col">
            <Suspense fallback={<LoadingMessages />}>
              <GuestBookEntries />
            </Suspense>
          </ul>
        </CardHeader>
      </Card>
    </section>
  );
}

async function GuestBookEntries() {
  const data = await getGuestBrookEntry();

  if (data.length === 0) {
    return null;
  }

  return data.map((item) => (
    <li key={item.id}>
      <div className="flex items-center">
        <img
          src={item.User?.profileimage as string}
          alt="User Profile Image"
          className="w-10 h-10 rounded-lg"
        />

        <p className="text-muted-foreground pl-3 break-words">
          {item.User?.firstname}:{" "}
          <span className="text-foreground">{item.message}</span>
        </p>
      </div>
    </li>
  ));
}

async function GuestBookForm() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (user) {
    return <Form />;
  }

  return (
    <div className="flex justify-between gap-4 flex-col md:flex-row">
      <Input type="text" placeholder="Your Message..." />
      <RegisterLink>
        <Button className="w-full">Sign for free</Button>
      </RegisterLink>
    </div>
  );
}
