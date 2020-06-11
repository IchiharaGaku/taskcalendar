<template>
  <div id="app">
    <FullCalendar
      class="full"
      defaultView="dayGridMonth"
      :locale="locale"
      :header="calendarHeader"
      :weekends="calendarWeekends"
      :plugins="calendarPlugins"
      :events="calendarEvents"
    />
    <div v-show="modaladd">
      <transition name="modal" appear>
        <div class="modal modal-overlay" @click="closeModaladd">
          <div class="modal-content" @click.stop>
            <p>~Schedule~</p>
            <div class="items">
              <div class="form">
                Title:
                <input type="text" v-model="title" />
              </div>
              <div class="form">
                Start:
                <input type="text" v-model="start" placeholder="YYYY-MM-DDT00:00:00" />
              </div>
              <div class="form">
                End:
                <input type="text" v-model="end" placeholder="YYYY-MM-DDT00:00:00" />
              </div>
            </div>

            <button class="ok" @click="decide" :events="calendarEvents">OK</button>
          </div>
        </div>
      </transition>
    </div>

    <div v-show="modaldelete">
      <transition name="modal" appear>
        <div class="modal modal-overlay" @click="closeModaldelete">
          <div class="modal-content" @click.stop>
            <p>~Schedule~</p>
            <div class="items">
              <div class="form">
                Title:
                <input type="text" v-model="title" />
              </div>
              <div class="form">
                Start:
                <input type="text" v-model="start" placeholder="YYYY-MM-DDT00:00:00" />
              </div>
              <div class="form">
                End:
                <input type="text" v-model="end" placeholder="YYYY-MM-DDT00:00:00" />
              </div>
            </div>

            <button class="ok" @click="del" :events="calendarEvents">OK</button>
          </div>
        </div>
      </transition>
    </div>
    <div class="buttons">
      <div class="add">
        <button @click="openModaladd">+</button>
      </div>
      <div class="delete">
        <button @click="openModaldelete">-</button>
      </div>
    </div>
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import jaLocale from "@fullcalendar/core/locales/ja";
import firebase from "firebase";

export default {
  components: {
    FullCalendar
  },
  data() {
    return {
      locale: jaLocale,
      template: "#calendar",
      component: FullCalendar,
      calendarPlugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      calendarHeader: {
        left: "prev.next today",
        center: "title",
        right: "dayGridMonth, timeGridWeek, timeGridDay, listweek"
      },
      calendarWeekends: true,
      calendarEvents: [
        {
          title: "報告会",
          start: "2020-06-10T10:00:00",
          end: "2020-06-10T12:30:00"
        },
        {
          title: "ミーティング",
          start: "2020-06-12T10:30:00",
          end: "2020-06-12T12:30:00"
        },
        {
          title: "打合せ",
          start: "2020-06-18T13:30:00",
          end: "2020-06-18T14:30:00"
        }
      ],
      title: "",
      start: "",
      end: "",
      modaladd: false,
      modaldelete: false,
      id: []
    };
  },
  methods: {
    openModaladd() {
      this.modaladd = true;
    },
    closeModaladd() {
      this.modaladd = false;
    },
    async decide() {
      var db = firebase.firestore();
      if (this.title.length > 0 && this.start.length > 0) {
        db.collection("schedules")
          .add({
            title: this.title,
            start: this.start,
            end: this.end
          })
          .then(doc => {
            console.log(doc);
          });
        this.calendarEvents.push({
          title: this.title,
          start: this.start,
          end: this.end
        });
        this.title = "";
        this.start = "";
        this.end = "";
      }
      this.closeModaladd();
    },
    openModaldelete() {
      this.modaldelete = true;
    },
    closeModaldelete() {
      this.modaldelete = false;
    },
    get() {
      var db = firebase.firestore();
      db.collection("schedules")
        .get()
        .then(query => {
          query(doc => {
            var id = doc.id;
            this.id.push(id);
          });
        });
    },
    async del() {
      var db = firebase.firestore();
      if (this.title.length > 0 && this.start.length > 0) {
        this.id.forEach(element => {
          db.collection("schedules")
            // .where("title", "==", this.title)
            // .where("start", "==", this.start)
            // .where("end", "==", this.end)
            .doc(element)
            .delete();
          // this.calendarEvents.delete();
        });
      }
      this.closeModaldelete();
    },
    created() {
      this.get();
    }
  }
};
</script>

<style lang="scss">
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";
td.fc-sat {
  background-color: #eaf4ff;
}
td.fc-sun {
  background-color: #ffeaea;
}
.full {
  width: 70%;
  height: 70%;
  margin: 0 auto;
}
.modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
}

.modal-content {
  background: #fff;
  overflow: hidden;
  width: 40%;
  height: 60%;
  background-color: #fff;
  border: #ccc;
  z-index: 50;
  margin: 0;
}
.modal-content p {
  font-size: 25px;
  margin: 20px auto 20%;
}

.form {
  display: flex;
  justify-content: space-around;
  margin: 40px 10px;
}
.modal-content input {
  width: 70%;
  border-bottom: 1px solid black;
}
.modal-footer {
  background: #ccc;
  padding: 10px;
  text-align: right;
  border: 1px solid black;
  color: black;
}
.ok {
  width: 20%;
  height: 40px;
  margin: 20px auto;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s;
}
.modal-content {
  transition: opacity 0.4s;
  transition: transform 0.4s;
}
.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}
.modal-content {
  opacity: 1;
  transform: translateY(-20px);
}
.buttons {
  display: flex;
  justify-content: center;
}
.add button {
  width: 40px;
  height: 40px;
  font-size: 20px;
  background-color: rgb(64, 51, 85);
  border-radius: 50%;
  color: #fff;
}
.delete button {
  width: 40px;
  height: 40px;
  font-size: 20px;
  background-color: rgb(64, 51, 85);
  border-radius: 50%;
  color: #fff;
}
</style>