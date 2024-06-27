import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()
export default function commonToast(description) {
  toast({
    description
  })
}
