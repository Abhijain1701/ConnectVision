"use client";

import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useState } from "react";
import Button from "../components/Button";

export default function CreateMeetingPage() {
  const [descriptionInput, setDescriptionInput] = useState("");
  const [startTimeInput, setstartTimeInput] = useState("");
  const [participantsInput, setParticipantsInput] = useState("");

  const [call, setCall] = useState<Call>();

  const client = useStreamVideoClient();
  const { user } = useUser();

  async function createMeeting() {
    if (!client || !user) {
      return;
    }
    try {
      const id = crypto.randomUUID();

      const call = client.call("default", id);

      await call.getOrCreate({
        data: {
          custom: { description: descriptionInput },
        },
      });

      setCall(call);
    } catch (error) {
      console.error(error);
      alert("somthing went wrong. please try again later.");
    }
  }

  if (!user || !client) {
    return <Loader2 className="mx-auto animate-spin" />;
  }
  return (
    <div className="border-md flex flex-col  items-center space-y-6 border">
      <h1 className="mt-4 text-center text-2xl font-bold">
        {/* 17 */}
        Welcome {user.username}!   
      </h1>

      <div className="rounded-mdbg-slate-200 mx-auto w-96 space-y-6 p-5">
        <h2 className="text-center text-xl font-semibold">
          Create new meeting
        </h2>
        <DescriptionInput
          value={descriptionInput}
          onChange={setDescriptionInput}
        />
        <StartTimeInput value={startTimeInput} onChange={setstartTimeInput} />
        <ParticipantsInput
          value={participantsInput}
          onChange={setParticipantsInput}
        />
        <Button className="w-full" onClick={createMeeting}>
          Create Meeting
        </Button>
      </div>
      {call && <MeetingLink call={call} />}
    </div>
  );
}

interface DescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

function DescriptionInput({ value, onChange }: DescriptionInputProps) {
  const [active, setActive] = useState(false);

  return (
    <div className="space-y-3">
      <div className="font-medium">Meeting Info:</div>
      <label className="flex items-center gap-1.5">
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => {
            setActive(e.target.checked);
            onChange("");
          }}
        />
        Add description
      </label>
      {active && (
        <label className="block space-y-1">
          <span className="font-medium">Description</span>
          <textarea
            className="border-gray-350 w-full rounded-md border p-2"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            maxLength={500}
          />
        </label>
      )}
    </div>
  );
}
interface StartTimeInputProps {
  value: string;
  onChange: (value: string) => void;
}
function StartTimeInput({ value, onChange }: StartTimeInputProps) {
  const [active, setActive] = useState(false);

  const dateTimeLocalNow = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60_000,
  )
    .toISOString()
    .slice(0, 10);

  return (
    <div className="space-y-3">
      <div className="font-medium">Meeting start</div>
      <label className="flex items-center gap-2">
        <input
          type="radio"
          checked={!active}
          onChange={() => {
            setActive(false);
            onChange("");
          }}
        />
        Start meeting immediately
      </label>

      <label className="flex items-center gap-2">
        <input
          type="radio"
          checked={active}
          onChange={() => {
            setActive(true);
            onChange(dateTimeLocalNow);
          }}
        />
        Start meeting at Date/Time
      </label>
      {active && (
        <label className="block space-y-1">
          <span className="font-medium">Start Time</span>
          <input
            type="datetime-local"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            min={dateTimeLocalNow}
            className="rounded-md-border w-full border-gray-400 p-2"
          />
        </label>
      )}
    </div>
  );
}

interface ParticipantsInputProps {
  value: string;
  onChange: (value: string) => void;
}

function ParticipantsInput({ value, onChange }: ParticipantsInputProps) {
  const [active, setActive] = useState(false);

  return (
    <div className="space-y-2">
      <div className="font-medium">Participants:</div>
      <label className="flex items-center gap-2">
        <input
          type="radio"
          checked={!active}
          onChange={() => {
            setActive(false);
            onChange("");
          }}
        />
        Everyone with Link can join
      </label>

      <label className="flex items-center gap-2">
        <input
          type="radio"
          checked={active}
          onChange={() => {
            setActive(true);
            onChange("");
          }}
        />
        Private Meeting
      </label>
      {active && (
        <label className="block space-y-1">
          <span className="font-medium">Participant emails</span>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter participant email addresses separated by commas"
            className="p-2s w-full rounded-md border border-gray-300"
          />
        </label>
      )}
    </div>
  );
}

interface MeetingLinkProps {
  call: Call;
}

function MeetingLink({ call }: MeetingLinkProps) {
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call.id}`;

  return <div className="text-center">{meetingLink}</div>;
}
