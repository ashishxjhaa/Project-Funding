import ListingContent from '@/components/ListingContent'
import ListingNavbar from '@/components/ListingNavbar'
import ListingWelcome from '@/components/ListingWelcome'


function Listing() {
  return (
    <div className='bg-[#2C2125] min-h-screen w-full'>
      <ListingNavbar />
      <ListingWelcome />
      <ListingContent />
    </div>
  )
}

export default Listing