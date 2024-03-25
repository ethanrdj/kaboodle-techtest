export type Accommodation = {
  id: number
  sort_order: number
  name: string
  type: {
    id: number
    name: string
  }
  description: string
  address_1?: string
  address_2?: string
  address_3?: string
  postcode: string
  country: Country
  resort: Resort
  location: AccommodationLocation
  images: Image[]
  rating: Rating
  facilities: Facility[]
  rooms: Room[]
}

export type AccommodationLocation = {
  id: number
  location_long: number
  location_lat: number
  name: string
}

export type Facility = {
  id: number
  label: string
}

export type Image = {
  alt: string
  title: string
  filename: string
}

export type Rating = {
  id: number
  label: string
}

export type Country = {
  id: number
  name: string
}

export type Resort = {
  id: number
  name: string
}

export type Room = {
  id: number
  sort_order: number
  type_id: number
  max_occupancy: number
  min_occupancy: number
  number_of_nights: number
  type: string
  name: string
  price: Price
  facilities?: Facility[]
}

export type Price = {
  value: number
  currency_id: number
  currency_iso_code: string
  currency_exponent: number
  price: string
}
