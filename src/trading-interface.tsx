"use client"

import { useState } from "react"
import { Bell, RefreshCcw, ChevronDown, ArrowUpDown, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { TokenSelectDialog } from "./token-select-dialog"
import { tokens, type Token } from "./token-list"

export default function TradingInterface() {
  const [sellToken, setSellToken] = useState<Token>(tokens[0]) // USDC
  const [buyToken, setBuyToken] = useState<Token>(tokens[1]) // SOL
  const [sellDialogOpen, setSellDialogOpen] = useState(false)
  const [buyDialogOpen, setBuyDialogOpen] = useState(false)

  const swapTokens = () => {
    const temp = sellToken
    setSellToken(buyToken)
    setBuyToken(temp)
  }

  return (
    <div className="w-full max-w-md mx-auto bg-slate-900 rounded-xl p-4 text-white">
      {/* Trading Type Tabs */}
      <Tabs defaultValue="instant" className="mb-6">
        <TabsList className="w-full bg-slate-800 p-1">
          <TabsTrigger
            value="instant"
            className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-lime-400"
          >
            <Zap className="w-4 h-4" />
            Instant
          </TabsTrigger>
          <TabsTrigger value="trigger" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Trigger
          </TabsTrigger>
          <TabsTrigger value="recurring" className="flex items-center gap-2">
            <RefreshCcw className="w-4 h-4" />
            Recurring
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Trading Mode */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex items-center gap-1">
          <span className="text-lg font-bold">ULTRA</span>
          <Badge variant="secondary" className="bg-lime-400 text-black">
            <Zap className="w-3 h-3" />
          </Badge>
          <Badge variant="secondary" className="bg-slate-700">
            ✕
          </Badge>
        </div>
        <span className="text-slate-400">MANUAL</span>
        <Button variant="ghost" size="icon" className="ml-auto">
          <RefreshCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Selling Section */}
      <div className="bg-slate-800 rounded-lg p-4 mb-2">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg">Selling</span>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">0 {sellToken.symbol}</span>
            <Button size="sm" variant="secondary" className="h-7">
              HALF
            </Button>
            <Button size="sm" variant="secondary" className="h-7">
              MAX
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="flex items-center gap-2 bg-slate-700/50 hover:bg-slate-700"
            onClick={() => setSellDialogOpen(true)}
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              {sellToken.symbol.charAt(0)}
            </div>
            {sellToken.symbol}
            <ChevronDown className="w-4 h-4" />
          </Button>
          <div className="text-right flex-1">
            <div className="text-4xl font-light">0.00</div>
            <div className="text-slate-400">$0</div>
          </div>
        </div>
      </div>

      {/* Swap Button */}
      <div className="relative h-0">
        <Button
          size="icon"
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-700 hover:bg-slate-600 z-10"
          onClick={swapTokens}
        >
          <ArrowUpDown className="w-4 h-4" />
        </Button>
      </div>

      {/* Buying Section */}
      <div className="bg-slate-800/50 rounded-lg p-4 mt-2">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg">Buying</span>
          <span className="text-slate-400">0 {buyToken.symbol}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="flex items-center gap-2 bg-slate-700/50 hover:bg-slate-700"
            onClick={() => setBuyDialogOpen(true)}
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              {buyToken.symbol.charAt(0)}
            </div>
            {buyToken.symbol}
            <ChevronDown className="w-4 h-4" />
          </Button>
          <div className="text-right flex-1">
            <div className="text-4xl font-light">0.00</div>
            <div className="text-slate-400">$0</div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-4 space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-lime-400" />
          <span className="text-slate-400">:</span>
          <Badge variant="outline" className="bg-lime-400/10 text-lime-400 border-lime-400/20">
            OPTIMISED
          </Badge>
          <Badge variant="outline" className="bg-purple-400/10 text-purple-400 border-purple-400/20">
            RTSE
          </Badge>
        </div>

        <Button className="w-full h-14 bg-gradient-to-r from-blue-500 via-green-400 to-green-300 hover:opacity-90 text-lg">
          <Zap className="w-5 h-5 mr-2" />
          Enter an amount
        </Button>
      </div>

      {/* Token Selection Dialogs */}
      <TokenSelectDialog
        open={sellDialogOpen}
        onClose={() => setSellDialogOpen(false)}
        onSelect={setSellToken}
        tokens={tokens}
        selectedToken={sellToken}
      />
      <TokenSelectDialog
        open={buyDialogOpen}
        onClose={() => setBuyDialogOpen(false)}
        onSelect={setBuyToken}
        tokens={tokens}
        selectedToken={buyToken}
      />
    </div>
  )
}

