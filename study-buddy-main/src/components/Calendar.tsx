'use client'
import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import TaskPopover from '@/components/TaskPopover'
import useEventData from '@/lib/hooks/useEventData'

export default function Calendar() {
    const { events, updateEvent } = useEventData()

    const isMobile = window.innerWidth < 768
    if (isMobile) {
        return (
            <FullCalendar
                plugins={[dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,]}
                initialView="timeGridWeek"
                events={events}
                eventContent={(eventInfo) => (
                    <TaskPopover event={eventInfo.event} />
                )}
                handleWindowResize={true}
                headerToolbar={{
                    left: 'prev,next today',
                    right: 'timeGridWeek,timeGridDay,dayGridMonth'
                }}
                displayEventTime={true}
                nowIndicator={true}
                editable={true}
                selectMirror={true}
                eventTimeFormat={{
                    hour: "numeric",
                    minute: "2-digit",
                    meridiem: "short",
                }}
                eventResize={updateEvent}
                eventDrop={updateEvent}
                timeZone="UTC"
                locale='en'
            />
        )
    }

    return (
        <FullCalendar
            plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
            ]}
            initialView="timeGridWeek"
            events={events}
            eventContent={(eventInfo) => (
                <TaskPopover event={eventInfo.event} />
            )}
            handleWindowResize={true}
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridWeek,timeGridDay,dayGridMonth'
            }}
            displayEventTime={true}
            nowIndicator={true}
            editable={true}
            selectMirror={true}
            eventTimeFormat={{
                hour: "numeric",
                minute: "2-digit",
                meridiem: "short",
            }}
            eventResize={updateEvent}
            eventDrop={updateEvent}
            timeZone="UTC"
            locale='en'
        />
    )
}
