import { Button } from "@/components/ui/button";

export default function Header() {

  return (
    <div className="w-full flex justify-between items-center flex-row p-4 ">
      <h1 className="text-2xl font-bold">
        SketchUI
      </h1>

      <Button>
        Get started
      </Button>
    </div>
  )
}
