import ListingContent from '@/components/ListingContent'
import ListingNavbar from '@/components/ListingNavbar'


function Listing() {
  return (
    <div className='bg-[#2C2125] min-h-screen w-full'>
      <ListingNavbar />
      <ListingContent />
    </div>
  )
}

export default Listing