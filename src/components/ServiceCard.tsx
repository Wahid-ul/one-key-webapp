import { selectService } from '../features/service/serviceSlice'
import type { ServiceType } from '../features/service/serviceSlice'
import { useAppDispatch } from '../app/hooks'

interface Props {
  title: Exclude<ServiceType, null>
}

const ServiceCard = ({ title }: Props) => {
  const dispatch = useAppDispatch()

  return (
    <div
      onClick={() => dispatch(selectService(title))}
      className="cursor-pointer bg-white shadow-md rounded-xl p-6 text-center font-semibold hover:bg-blue-50 transition"
    >
      {title}
    </div>
  )
}

export default ServiceCard
