import { CalendarDays, Mail, MapPin, Phone } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import {
  addOns,
  cities,
  cuisineStyles,
  eventTypes,
  mealTimes,
  menuTypes,
  packages,
  serviceStyles,
} from '../data'
import Reveal, { SectionEyebrow, SectionTitle } from './Reveal'

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  altPhone: '',
  eventType: 'Wedding',
  date: '',
  mealTime: 'Lunch',
  startTime: '12:00',
  guests: '80',
  vegGuests: '50',
  nonVegGuests: '30',
  city: 'Chennai',
  venue: '',
  address: '',
  packageName: 'Wedding Sadya',
  cuisine: 'Mixed South Indian',
  menuType: 'Vegetarian + Non-vegetarian',
  serviceStyle: 'Banana leaf',
  addOnIds: [],
  dietNotes: '',
  message: '',
}

const formatINR = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)

function makeOrderId() {
  const stamp = new Date()
  const date = `${stamp.getFullYear()}${String(stamp.getMonth() + 1).padStart(2, '0')}${String(stamp.getDate()).padStart(2, '0')}`
  const rand = String(Math.floor(100 + Math.random() * 900))
  return `AK-${date}-${rand}`
}

export default function Contact({ selectedPackage, onPackageChange }) {
  const [form, setForm] = useState(emptyForm)
  const [order, setOrder] = useState(null)

  useEffect(() => {
    if (!selectedPackage) return
    setForm((current) => ({ ...current, packageName: selectedPackage }))
  }, [selectedPackage])

  const update = (field) => (event) => {
    const value = event.target.value
    setForm((current) => ({ ...current, [field]: value }))
    if (field === 'packageName' && onPackageChange) {
      onPackageChange(value)
    }
  }

  const toggleAddOn = (id) => {
    setForm((current) => {
      const has = current.addOnIds.includes(id)
      return {
        ...current,
        addOnIds: has
          ? current.addOnIds.filter((item) => item !== id)
          : [...current.addOnIds, id],
      }
    })
  }

  const guestCount = Math.max(0, Number(form.guests) || 0)
  const chosenPackage = packages.find((item) => item.name === form.packageName)
  const mixedMenu = form.menuType === 'Vegetarian + Non-vegetarian'

  const estimate = useMemo(() => {
    const food = (chosenPackage?.rate || 0) * guestCount
    const extras = addOns
      .filter((item) => form.addOnIds.includes(item.id))
      .reduce(
        (sum, item) =>
          sum + (item.per === 'guest' ? item.price * guestCount : item.price),
        0,
      )
    return { food, extras, total: food + extras }
  }, [chosenPackage, form.addOnIds, guestCount])

  const submit = (event) => {
    event.preventDefault()
    setOrder({
      id: makeOrderId(),
      ...form,
      guests: guestCount,
      total: estimate.total,
      packageRate: chosenPackage?.rate || 0,
    })
  }

  const reset = () => {
    setOrder(null)
    setForm({
      ...emptyForm,
      packageName: selectedPackage || emptyForm.packageName,
    })
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <section id="contact" className="bg-ivory py-24 sm:py-32">
      <div className="site-inner grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <SectionEyebrow>Place an order</SectionEyebrow>
            <SectionTitle>
              Catering details,
              <span className="italic text-sage"> ready for the kitchen.</span>
            </SectionTitle>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-6 max-w-md text-stone">
              Fill in the feast — guests, menu, venue, and add-ons. We confirm
              availability and send a final quote within one working day.
            </p>
            <ul className="mt-10 space-y-5">
              {[
                [MapPin, '14 Luz Church Road, Mylapore, Chennai'],
                [Phone, '+91 44 4567 2108'],
                [Mail, 'hello@ammakitchen.in'],
                [CalendarDays, 'Orders: 7 days’ notice preferred'],
              ].map(([Icon, line]) => (
                <li key={line} className="flex items-center gap-3 text-sm">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-linen text-gold">
                    <Icon size={16} />
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            {!order && (
              <div className="mt-10 rounded-[1.4rem] bg-espresso p-6 text-cream">
                <p className="text-[11px] tracking-[0.2em] text-gold-light uppercase">
                  Estimated total
                </p>
                <p className="font-display mt-2 text-4xl">
                  {formatINR(estimate.total)}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-cream/60">
                  {guestCount || 0} guests · {form.packageName}
                  {form.addOnIds.length
                    ? ` · ${form.addOnIds.length} add-on${form.addOnIds.length > 1 ? 's' : ''}`
                    : ''}
                  . Final price confirmed after tasting.
                </p>
              </div>
            )}
          </Reveal>
        </div>

        <Reveal className="lg:col-span-8" delay={80}>
          <form
            onSubmit={submit}
            className="rounded-[1.8rem] border border-linen bg-cream p-6 shadow-[0_24px_70px_rgba(28,25,20,0.05)] sm:p-8"
          >
            {order ? (
              <OrderReceipt order={order} onReset={reset} />
            ) : (
              <div className="space-y-8">
                <FormSection title="Your details">
                  <Field label="Full name">
                    <input
                      required
                      value={form.name}
                      onChange={update('name')}
                      placeholder="Meera Iyer"
                      className="field-input"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={update('email')}
                      placeholder="meera@email.com"
                      className="field-input"
                    />
                  </Field>
                  <Field label="Phone">
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={update('phone')}
                      placeholder="+91 98xxx xxxxx"
                      className="field-input"
                    />
                  </Field>
                  <Field label="Alternate phone">
                    <input
                      type="tel"
                      value={form.altPhone}
                      onChange={update('altPhone')}
                      placeholder="Optional"
                      className="field-input"
                    />
                  </Field>
                </FormSection>

                <FormSection title="Event details">
                  <Field label="Event type">
                    <select
                      required
                      value={form.eventType}
                      onChange={update('eventType')}
                      className="field-input"
                    >
                      {eventTypes.map((type) => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Event date">
                    <input
                      required
                      type="date"
                      min={today}
                      value={form.date}
                      onChange={update('date')}
                      className="field-input"
                    />
                  </Field>
                  <Field label="Meal">
                    <select
                      required
                      value={form.mealTime}
                      onChange={update('mealTime')}
                      className="field-input"
                    >
                      {mealTimes.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Serving time">
                    <input
                      required
                      type="time"
                      value={form.startTime}
                      onChange={update('startTime')}
                      className="field-input"
                    />
                  </Field>
                  <Field label="Total guests">
                    <input
                      required
                      type="number"
                      min="10"
                      max="600"
                      value={form.guests}
                      onChange={update('guests')}
                      placeholder="80"
                      className="field-input"
                    />
                  </Field>
                  <Field label="City">
                    <select
                      required
                      value={form.city}
                      onChange={update('city')}
                      className="field-input"
                    >
                      {cities.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Venue name" className="sm:col-span-2">
                    <input
                      required
                      value={form.venue}
                      onChange={update('venue')}
                      placeholder="Temple kalyana mandapam / home / office"
                      className="field-input"
                    />
                  </Field>
                  <Field label="Full venue address" className="sm:col-span-2">
                    <textarea
                      required
                      rows="2"
                      value={form.address}
                      onChange={update('address')}
                      placeholder="Street, landmark, pincode"
                      className="field-input resize-none"
                    />
                  </Field>
                </FormSection>

                <FormSection title="Menu & service">
                  <Field label="Package">
                    <select
                      required
                      value={form.packageName}
                      onChange={update('packageName')}
                      className="field-input"
                    >
                      {packages.map((item) => (
                        <option key={item.name} value={item.name}>
                          {item.name} — {item.price} {item.unit}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Cuisine">
                    <select
                      required
                      value={form.cuisine}
                      onChange={update('cuisine')}
                      className="field-input"
                    >
                      {cuisineStyles.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Menu type">
                    <select
                      required
                      value={form.menuType}
                      onChange={update('menuType')}
                      className="field-input"
                    >
                      {menuTypes.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Service style">
                    <select
                      required
                      value={form.serviceStyle}
                      onChange={update('serviceStyle')}
                      className="field-input"
                    >
                      {serviceStyles.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </Field>
                  {mixedMenu && (
                    <>
                      <Field label="Vegetarian guests">
                        <input
                          type="number"
                          min="0"
                          value={form.vegGuests}
                          onChange={update('vegGuests')}
                          className="field-input"
                        />
                      </Field>
                      <Field label="Non-vegetarian guests">
                        <input
                          type="number"
                          min="0"
                          value={form.nonVegGuests}
                          onChange={update('nonVegGuests')}
                          className="field-input"
                        />
                      </Field>
                    </>
                  )}
                  <div className="sm:col-span-2">
                    <p className="mb-3 text-[11px] tracking-[0.18em] text-stone uppercase">
                      Add-ons
                    </p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {addOns.map((item) => {
                        const selected = form.addOnIds.includes(item.id)
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => toggleAddOn(item.id)}
                            className={`rounded-2xl border px-4 py-3 text-left transition-all duration-300 ${
                              selected
                                ? 'border-gold bg-ivory shadow-[0_0_0_1px_var(--color-gold)]'
                                : 'border-linen bg-ivory hover:border-gold/50'
                            }`}
                          >
                            <span className="block text-sm text-espresso">
                              {item.label}
                            </span>
                            <span className="mt-1 block text-xs text-stone">
                              {formatINR(item.price)} / {item.per}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </FormSection>

                <FormSection title="Kitchen notes">
                  <Field
                    label="Dietary needs"
                    className="sm:col-span-2"
                  >
                    <input
                      value={form.dietNotes}
                      onChange={update('dietNotes')}
                      placeholder="Jain, no onion-garlic, nut allergy, less spice…"
                      className="field-input"
                    />
                  </Field>
                  <Field label="Special requests" className="sm:col-span-2">
                    <textarea
                      rows="3"
                      value={form.message}
                      onChange={update('message')}
                      placeholder="Family recipes, live counters, kids’ plates, puja timing…"
                      className="field-input resize-none"
                    />
                  </Field>
                </FormSection>

                <div className="flex flex-col gap-3 border-t border-linen pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-stone">
                    Food {formatINR(estimate.food)} + add-ons{' '}
                    {formatINR(estimate.extras)}
                  </p>
                  <button
                    type="submit"
                    className="rounded-full bg-espresso px-8 py-3.5 text-[12px] font-semibold tracking-[0.2em] text-cream uppercase transition-all duration-300 hover:bg-ink hover:shadow-lg"
                  >
                    Place catering order
                  </button>
                </div>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  )
}

function FormSection({ title, children }) {
  return (
    <fieldset>
      <legend className="font-display mb-4 text-2xl text-espresso">{title}</legend>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  )
}

function Field({ label, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-[11px] tracking-[0.18em] text-stone uppercase">
        {label}
      </span>
      {children}
    </label>
  )
}

function OrderReceipt({ order, onReset }) {
  const extras = addOns.filter((item) => order.addOnIds.includes(item.id))

  return (
    <div className="fade-slide space-y-6">
      <div className="text-center sm:text-left">
        <p className="text-[11px] tracking-[0.22em] text-gold uppercase">
          Order received
        </p>
        <h3 className="font-display mt-2 text-4xl text-espresso">
          Vanakkam — the kitchen has it.
        </h3>
        <p className="mt-2 text-sm text-stone">
          Reference <span className="font-medium text-espresso">{order.id}</span>
          . We will call {order.phone} to confirm the menu and deposit.
        </p>
      </div>

      <dl className="grid gap-3 rounded-2xl bg-ivory p-5 text-sm sm:grid-cols-2">
        {[
          ['Package', order.packageName],
          ['Event', `${order.eventType} · ${order.date || 'Date TBC'}`],
          ['Meal', `${order.mealTime} at ${order.startTime}`],
          ['Guests', `${order.guests} · ${order.menuType}`],
          ['Cuisine', order.cuisine],
          ['Service', order.serviceStyle],
          ['Venue', `${order.venue}, ${order.city}`],
          ['Estimate', formatINR(order.total)],
        ].map(([label, value]) => (
          <div key={label}>
            <dt className="text-[11px] tracking-[0.16em] text-stone uppercase">
              {label}
            </dt>
            <dd className="mt-1 text-espresso">{value}</dd>
          </div>
        ))}
      </dl>

      {extras.length > 0 && (
        <p className="text-sm text-stone">
          Add-ons: {extras.map((item) => item.label).join(', ')}
        </p>
      )}

      <p className="text-xs leading-relaxed text-stone">
        Address: {order.address}
        {order.dietNotes ? ` · Diet: ${order.dietNotes}` : ''}
      </p>

      <button
        type="button"
        onClick={onReset}
        className="rounded-full bg-espresso px-6 py-3 text-[11px] font-semibold tracking-[0.18em] text-cream uppercase"
      >
        Place another order
      </button>
    </div>
  )
}
