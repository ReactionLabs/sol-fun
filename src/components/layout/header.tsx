'use client'

import React from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useConnection } from '@solana/wallet-adapter-react'
import { WalletButton } from '../solana/solana-provider'
import { Button } from '../ui/button'
import { NetworkSelector } from '../solana/network-selector'
import { AirdropButton } from '../solana/airdrop-button'
import { useCluster } from '../cluster/cluster-data-access'
import { ClusterNetwork } from '../cluster/cluster-data-access'
import Image from 'next/image'
import { Search, ChevronDown, User, Settings, LogOut, Menu, X } from 'lucide-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ellipsify } from '../ui/ui-layout'

export function Header() {
  const { connection } = useConnection()
  const { publicKey } = useWallet()
  const [balance, setBalance] = useState<number | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { cluster } = useCluster()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    async function getBalance() {
      if (publicKey) {
        try {
          const balance = await connection.getBalance(publicKey)
          setBalance(balance / LAMPORTS_PER_SOL)
        } catch (e) {
          console.error('Error fetching balance:', e)
          setBalance(null)
        }
      }
    }

    getBalance()
    const interval = setInterval(getBalance, 30000)
    return () => clearInterval(interval)
  }, [publicKey, connection])

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#1E1B2E]/80 backdrop-blur-sm border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Image 
              src="/logo.png"
              alt="SolCrusher Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-xl font-bold">SolCrusher</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search tokens or paste address"
                className="w-96 bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#14F195]"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-500" />
            </div>
            {publicKey && balance !== null ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-4 py-2 bg-[#1E293B] rounded-full border border-[#334155] hover:bg-[#1E293B]/80">
                    <Image 
                      src="/sol.svg"
                      alt="SOL"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">
                      {balance.toFixed(2)} SOL
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-[#1E1B2E] border border-purple-500/20 text-white">
                  <DropdownMenuLabel>
                    <div className="text-xs text-gray-400">Connected as</div>
                    <div className="font-mono text-sm">{ellipsify(publicKey.toString())}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-purple-500/20" />
                  <Link href="/account">
                    <DropdownMenuItem className="cursor-pointer hover:bg-purple-500/10">
                      <User className="w-4 h-4 mr-2" />
                      Account
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/dashboard">
                    <DropdownMenuItem className="cursor-pointer hover:bg-purple-500/10">
                      <Settings className="w-4 h-4 mr-2" />
                      Dashboard
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator className="bg-purple-500/20" />
                  <DropdownMenuItem 
                    className="cursor-pointer text-red-400 hover:bg-red-500/10 hover:text-red-300"
                    onClick={() => {
                      // Add wallet disconnect logic here if needed
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
            {cluster.network === ClusterNetwork.Devnet && <AirdropButton />}
            <NetworkSelector />
            {!publicKey ? (
              <WalletButton />
            ) : !isAuthenticated ? (
              <Button className="bg-[#14F195] hover:bg-[#14F195]/90 text-black">
                Verify Wallet
              </Button>
            ) : null}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-[#1E1B2E] border-l border-purple-500/20 p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-purple-500/20">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search tokens or paste address"
                      className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#14F195]"
                    />
                    <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-500" />
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  {publicKey && (
                    <div className="mb-4 p-3 bg-[#1E293B] rounded-lg">
                      <div className="text-xs text-gray-400">Connected as</div>
                      <div className="font-mono text-sm">{ellipsify(publicKey.toString())}</div>
                      <div className="mt-2 flex items-center gap-2">
                        <Image 
                          src="/sol.svg"
                          alt="SOL"
                          width={16}
                          height={16}
                          className="w-4 h-4"
                        />
                        <span className="text-sm font-medium">
                          {balance?.toFixed(2)} SOL
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Link href="/account">
                      <Button variant="ghost" className="w-full justify-start">
                        <User className="w-4 h-4 mr-2" />
                        Account
                      </Button>
                    </Link>
                    <Link href="/dashboard">
                      <Button variant="ghost" className="w-full justify-start">
                        <Settings className="w-4 h-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                  </div>

                  <div className="space-y-2">
                    {cluster.network === ClusterNetwork.Devnet && <AirdropButton className="w-full" />}
                    <NetworkSelector />
                    {!publicKey ? (
                      <WalletButton />
                    ) : !isAuthenticated ? (
                      <Button className="w-full bg-[#14F195] hover:bg-[#14F195]/90 text-black">
                        Verify Wallet
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
} 