var trend_up_good = "<span class=\"badge badge-success\"><i class=\"fa fa-caret-up\"></i> ";
var trend_up_bad = "<span class=\"badge badge-danger\"><i class=\"fa fa-caret-up\"></i> ";
var trend_down_bad = "<span class=\"badge badge-danger\"><i class=\"fa fa-caret-down\"></i> ";
var trend_down_good = "<span class=\"badge badge-success\"><i class=\"fa fa-caret-down\"></i> ";
var trend_same = "<span class=\"badge badge-warning\"><i class=\"fa fa-caret-right\"></i> ";

var trend_end = "</span>";

function trend(trend) {
    if (!trend) {
        return trend_same + '?' + trend_end;
    }
    switch (trend.direction) {
        case '+':
            return (trend.reversed ? trend_up_bad : trend_up_good) + trend.text + trend_end;
        case '-':
            return (trend.reversed ? trend_down_good : trend_down_bad) + trend.text + trend_end;
        default:
            return trend_same + trend.text + trend_end;
    }
}

function smallTrend(trend) {
    if (!trend) {
        return ' <i class="text-warning fa fa-caret-right"></i>';
    }
    switch (trend.direction) {
        case '+':
            trend_color = trend.reversed ? 'text-danger' : 'text-success';
            return ' <i class="' + trend_color + ' fa fa-caret-up" title="' + trend.text + '"></i>';
        case '-':
            trend_color = trend.reversed ? 'text-success' : 'text-danger';
            return ' <i class="' + trend_color + ' fa fa-caret-down" title="' + trend.text + '"></i>';
        default:
            return ' <i class="text-warning fa fa-caret-right" title="' + trend.text + '"></i>';
    }
}

function displayError(element, error) {
    insertElementAfterElement(element.querySelector('.d-sm-flex'), () => {
        const alert = document.createElement('div');
        alert.classList.add('alert', 'alert-danger');
        alert.setAttribute('role', 'alert');
        alert.innerText = `Failed to load values: ${error}`;
        return alert;
    })
}

/* This function loads Server Overview tab */
function loadserverOverviewValues(json, error) {
    const tab = document.getElementById('server-overview');

    if (error) {
        displayError(tab, error);
        return;
    }

    // Last 7 days
    let data = json.last_7_days;
    let element = tab.querySelector('#data_7_days');

    element.querySelector('#data_unique').innerText = data.unique_players;
    element.querySelector('#data_unique_day').innerText = data.unique_players_day;
    element.querySelector('#data_new').innerText = data.new_players;
    element.querySelector('#data_retention').innerText = '(' + data.new_players_retention + '/' + data.new_players + ')';
    element.querySelector('#data_retention_perc').innerText = data.new_players_retention_perc;

    element.querySelector('#data_avg_tps').innerText = data.average_tps;
    element.querySelector('#data_low_tps_spikes').innerText = data.low_tps_spikes;
    element.querySelector('#data_downtime').innerText = data.downtime;

    // Server As Numbers
    data = json.numbers;
    element = tab.querySelector('#data_numbers');

    element.querySelector('#data_total').innerText = data.total_players;
    element.querySelector('#data_regular').innerText = data.regular_players;
    element.querySelector('#data_online').innerText = data.online_players;

    element.querySelector('#data_last_peak_date').innerText = data.last_peak_date;
    element.querySelector('#data_last_peak_players').innerText = data.last_peak_players;
    element.querySelector('#data_best_peak_date').innerText = data.best_peak_date;
    element.querySelector('#data_best_peak_players').innerText = data.best_peak_players;

    element.querySelector('#data_playtime').innerText = data.playtime;
    element.querySelector('#data_player_playtime').innerText = data.player_playtime;
    element.querySelector('#data_sessions').innerText = data.sessions;

    element.querySelector('#data_player_kills').innerText = data.player_kills;
    element.querySelector('#data_mob_kills').innerText = data.mob_kills;
    element.querySelector('#data_deaths').innerText = data.deaths;

    // Week Comparison
    data = json.weeks;
    element = tab.querySelector('#data_weeks');

    element.querySelector('#data_start').innerText = data.start;
    element.querySelector('#data_midpoint').innerText = data.midpoint;
    element.querySelector('#data_midpoint2').innerText = data.midpoint;
    element.querySelector('#data_end').innerText = data.end;

    element.querySelector('#data_unique_before').innerText = data.unique_before;
    element.querySelector('#data_unique_after').innerText = data.unique_after;
    element.querySelector('#data_unique_trend').innerHTML = trend(data.unique_trend);
    element.querySelector('#data_new_before').innerText = data.new_before;
    element.querySelector('#data_new_after').innerText = data.new_after;
    element.querySelector('#data_new_trend').innerHTML = trend(data.new_trend);
    element.querySelector('#data_regular_before').innerText = data.regular_before;
    element.querySelector('#data_regular_after').innerText = data.regular_after;
    element.querySelector('#data_regular_trend').innerHTML = trend(data.regular_trend);

    element.querySelector('#data_average_playtime_before').innerText = data.average_playtime_before;
    element.querySelector('#data_average_playtime_after').innerText = data.average_playtime_after;
    element.querySelector('#data_average_playtime_trend').innerHTML = trend(data.average_playtime_trend);
    element.querySelector('#data_sessions_before').innerText = data.sessions_before;
    element.querySelector('#data_sessions_after').innerText = data.sessions_after;
    element.querySelector('#data_sessions_trend').innerHTML = trend(data.sessions_trend);

    element.querySelector('#data_player_kills_before').innerText = data.player_kills_before;
    element.querySelector('#data_player_kills_after').innerText = data.player_kills_after;
    element.querySelector('#data_player_kills_trend').innerHTML = trend(data.player_kills_trend);
    element.querySelector('#data_mob_kills_before').innerText = data.mob_kills_before;
    element.querySelector('#data_mob_kills_after').innerText = data.mob_kills_after;
    element.querySelector('#data_mob_kills_trend').innerHTML = trend(data.mob_kills_trend);
    element.querySelector('#data_deaths_before').innerText = data.deaths_before;
    element.querySelector('#data_deaths_after').innerText = data.deaths_after;
    element.querySelector('#data_deaths_trend').innerHTML = trend(data.deaths_trend);
}

/* This function loads Online Activity Overview tab */
function loadOnlineActivityOverviewValues(json, error) {
    const tab = document.getElementById('online-activity-overview');

    if (error) {
        displayError(tab, error);
        return;
    }

    // Online Activity as Numbers
    let data = json.numbers;
    let element = tab.querySelector('#data_numbers');

    element.querySelector('#data_unique_players_30d').innerHTML = data.unique_players_30d + smallTrend(data.unique_players_30d_trend);
    element.querySelector('#data_unique_players_7d').innerText = data.unique_players_7d;
    element.querySelector('#data_unique_players_24h').innerText = data.unique_players_24h;

    element.querySelector('#data_unique_players_30d_avg').innerHTML = data.unique_players_30d_avg + smallTrend(data.unique_players_30d_avg_trend);
    element.querySelector('#data_unique_players_7d_avg').innerText = data.unique_players_7d_avg;
    element.querySelector('#data_unique_players_24h_avg').innerText = data.unique_players_24h_avg;

    element.querySelector('#data_new_players_30d').innerHTML = data.new_players_30d + smallTrend(data.new_players_30d_trend);
    element.querySelector('#data_new_players_7d').innerText = data.new_players_7d;
    element.querySelector('#data_new_players_24h').innerText = data.new_players_24h;

    element.querySelector('#data_new_players_30d_avg').innerHTML = data.new_players_30d_avg + smallTrend(data.new_players_30d_avg_trend);
    element.querySelector('#data_new_players_7d_avg').innerText = data.new_players_7d_avg;
    element.querySelector('#data_new_players_24h_avg').innerText = data.new_players_24h_avg;

    element.querySelector('#data_new_players_retention_30d').innerText = '(' + data.new_players_retention_30d + '/' + data.new_players_30d + ') ' + data.new_players_retention_30d_perc;
    element.querySelector('#data_new_players_retention_7d').innerText = '(' + data.new_players_retention_7d + '/' + data.new_players_7d + ') ' + data.new_players_retention_7d_perc;
    element.querySelector('#data_new_players_retention_24h').innerHTML = '(' + data.new_players_retention_24h + '/' + data.new_players_24h + ') ' + data.new_players_retention_24h_perc + ' <i class="far fa-fw fa-eye"></i>';

    element.querySelector('#data_playtime_30d').innerHTML = data.playtime_30d + smallTrend(data.playtime_30d_trend);
    element.querySelector('#data_playtime_7d').innerText = data.playtime_7d;
    element.querySelector('#data_playtime_24h').innerText = data.playtime_24h;

    element.querySelector('#data_playtime_30d_avg').innerHTML = data.playtime_30d_avg + smallTrend(data.playtime_30d_avg_trend);
    element.querySelector('#data_playtime_7d_avg').innerText = data.playtime_7d_avg;
    element.querySelector('#data_playtime_24h_avg').innerText = data.playtime_24h_avg;

    element.querySelector('#data_session_length_30d_avg').innerHTML = data.session_length_30d_avg + smallTrend(data.session_length_30d_trend);
    element.querySelector('#data_session_length_7d_avg').innerText = data.session_length_7d_avg;
    element.querySelector('#data_session_length_24h_avg').innerText = data.session_length_24h_avg;

    element.querySelector('#data_sessions_30d').innerHTML = data.sessions_30d + smallTrend(data.sessions_30d_trend);
    element.querySelector('#data_sessions_7d').innerText = data.sessions_7d;
    element.querySelector('#data_sessions_24h').innerText = data.sessions_24h;

    // Insights
    data = json.insights;
    element = tab.querySelector('#data_insights');

    element.querySelector('#data_players_first_join_avg').innerHTML = data.players_first_join_avg + smallTrend(data.players_first_join_trend);
    element.querySelector('#data_first_session_length_avg').innerHTML = data.first_session_length_avg + smallTrend(data.first_session_length_trend);
    element.querySelector('#data_first_session_length_median').innerHTML = data.first_session_length_median + smallTrend(data.first_session_length_median_trend);
    element.querySelector('#data_lone_joins').innerHTML = data.lone_joins + smallTrend(data.lone_joins_trend);
    element.querySelector('#data_lone_new_joins').innerHTML = data.lone_new_joins + smallTrend(data.lone_new_joins_trend);
}

/* This function loads Sessions tab */
function loadSessionValues(json, error) {
    const tab = document.getElementById('sessions-overview');

    if (error) {
        displayError(tab, error);
        return;
    }

    // Insights
    let data = json.insights;
    const element = tab.querySelector('#data_insights');

    element.querySelector('#data_most_active_gamemode').innerText = data.most_active_gamemode;
    element.querySelector('#data_most_active_gamemode_perc').innerText = data.most_active_gamemode_perc;
    element.querySelector('#data_server_occupied').innerText = "~" + data.server_occupied;
    element.querySelector('#data_server_occupied_perc').innerText = data.server_occupied_perc;
    element.querySelector('#data_total_playtime').innerText = data.total_playtime;
    element.querySelector('#data_afk_time').innerText = data.afk_time;
    element.querySelector('#data_afk_time_perc').innerText = data.afk_time_perc;
}

/* This function loads PvP & PvE tab */
function loadPvPPvEValues(json, error) {
    const tab = document.getElementById('pvp-pve');

    if (error) {
        displayError(tab, error);
        return;
    }

    // as Numbers
    let data = json.numbers;
    let element = tab.querySelector('#data_numbers');

    element.querySelector('#data_player_kills_total').innerText = data.player_kills_total;
    element.querySelector('#data_player_kills_30d').innerText = data.player_kills_30d;
    element.querySelector('#data_player_kills_7d').innerText = data.player_kills_7d;

    element.querySelector('#data_player_kdr_avg').innerText = data.player_kdr_avg;
    element.querySelector('#data_player_kdr_avg_30d').innerText = data.player_kdr_avg_30d;
    element.querySelector('#data_player_kdr_avg_7d').innerText = data.player_kdr_avg_7d;

    element.querySelector('#data_mob_kills_total').innerText = data.mob_kills_total;
    element.querySelector('#data_mob_kills_30d').innerText = data.mob_kills_30d;
    element.querySelector('#data_mob_kills_7d').innerText = data.mob_kills_7d;

    element.querySelector('#data_mob_deaths_total').innerText = data.mob_deaths_total;
    element.querySelector('#data_mob_deaths_30d').innerText = data.mob_deaths_30d;
    element.querySelector('#data_mob_deaths_7d').innerText = data.mob_deaths_7d;

    element.querySelector('#data_mob_kdr_total').innerText = data.mob_kdr_total;
    element.querySelector('#data_mob_kdr_30d').innerText = data.mob_kdr_30d;
    element.querySelector('#data_mob_kdr_7d').innerText = data.mob_kdr_7d;

    element.querySelector('#data_deaths_total').innerText = data.deaths_total;
    element.querySelector('#data_deaths_30d').innerText = data.deaths_30d;
    element.querySelector('#data_deaths_7d').innerText = data.deaths_7d;

    // Insights
    data = json.insights;
    element = tab.querySelector('#data_insights');

    element.querySelector('#data_weapon_1st').innerText = data.weapon_1st;
    element.querySelector('#data_weapon_2nd').innerText = data.weapon_2nd;
    element.querySelector('#data_weapon_3rd').innerText = data.weapon_3rd;
}

/* This function loads Playerbase Overview tab */
function loadPlayerbaseOverviewValues(json, error) {
    const tab = document.getElementById('playerbase-overview');
    if (error) {
        displayError(tab, error);
        return;
    }

    // Trends
    let data = json.trends;
    let element = tab.querySelector('#data_trends');

    element.querySelector('#data_total_players_then').innerText = data.total_players_then;
    element.querySelector('#data_total_players_now').innerText = data.total_players_now;
    element.querySelector('#data_total_players_trend').innerHTML = trend(data.total_players_trend);
    element.querySelector('#data_regular_players_then').innerText = data.regular_players_then;
    element.querySelector('#data_regular_players_now').innerText = data.regular_players_now;
    element.querySelector('#data_regular_players_trend').innerHTML = trend(data.regular_players_trend);
    element.querySelector('#data_playtime_avg_then').innerText = data.playtime_avg_then;
    element.querySelector('#data_playtime_avg_now').innerText = data.playtime_avg_now;
    element.querySelector('#data_playtime_avg_trend').innerHTML = trend(data.playtime_avg_trend);
    element.querySelector('#data_afk_then').innerText = data.afk_then;
    element.querySelector('#data_afk_now').innerText = data.afk_now;
    element.querySelector('#data_afk_trend').innerHTML = trend(data.afk_trend);
    element.querySelector('#data_regular_playtime_avg_then').innerText = data.regular_playtime_avg_then;
    element.querySelector('#data_regular_playtime_avg_now').innerText = data.regular_playtime_avg_now;
    element.querySelector('#data_regular_playtime_avg_trend').innerHTML = trend(data.regular_playtime_avg_trend);
    element.querySelector('#data_regular_session_avg_then').innerText = data.regular_session_avg_then;
    element.querySelector('#data_regular_session_avg_now').innerText = data.regular_session_avg_now;
    element.querySelector('#data_regular_session_avg_trend').innerHTML = trend(data.regular_session_avg_trend);
    element.querySelector('#data_regular_afk_then').innerText = data.regular_afk_avg_then;
    element.querySelector('#data_regular_afk_now').innerText = data.regular_afk_avg_now;
    element.querySelector('#data_regular_afk_trend').innerHTML = trend(data.regular_afk_avg_trend);

    // Insights
    data = json.insights;
    element = tab.querySelector('#data_insights');

    element.querySelector('#data_new_to_regular').innerHTML = data.new_to_regular + smallTrend(data.new_to_regular_trend);
    element.querySelector('#data_regular_to_inactive').innerHTML = data.regular_to_inactive + smallTrend(data.regular_to_inactive_trend);
}

/* This function loads Performance tab */
function loadPerformanceValues(json, error) {
    const tab = document.getElementById('performance');
    if (error) {
        displayError(tab, error);
        return;
    }

    // as Numbers
    let data = json.numbers;
    let element = tab.querySelector('#data_numbers');

    element.querySelector('#data_low_tps_spikes_30d').innerText = data.low_tps_spikes_30d;
    element.querySelector('#data_low_tps_spikes_7d').innerText = data.low_tps_spikes_7d;
    element.querySelector('#data_low_tps_spikes_24h').innerText = data.low_tps_spikes_24h;
    element.querySelector('#data_server_downtime_30d').innerText = data.server_downtime_30d;
    element.querySelector('#data_server_downtime_7d').innerText = data.server_downtime_7d;
    element.querySelector('#data_server_downtime_24h').innerText = data.server_downtime_24h;
    element.querySelector('#data_tps_30d').innerText = data.tps_30d;
    element.querySelector('#data_tps_7d').innerText = data.tps_7d;
    element.querySelector('#data_tps_24h').innerText = data.tps_24h;
    element.querySelector('#data_cpu_30d').innerText = data.cpu_30d;
    element.querySelector('#data_cpu_7d').innerText = data.cpu_7d;
    element.querySelector('#data_cpu_24h').innerText = data.cpu_24h;
    element.querySelector('#data_ram_30d').innerText = data.ram_30d;
    element.querySelector('#data_ram_7d').innerText = data.ram_7d;
    element.querySelector('#data_ram_24h').innerText = data.ram_24h;
    element.querySelector('#data_entities_30d').innerText = data.entities_30d;
    element.querySelector('#data_entities_7d').innerText = data.entities_7d;
    element.querySelector('#data_entities_24h').innerText = data.entities_24h;
    element.querySelector('#data_chunks_30d').innerText = data.chunks_30d;
    element.querySelector('#data_chunks_7d').innerText = data.chunks_7d;
    element.querySelector('#data_chunks_24h').innerText = data.chunks_24h;
    element.querySelector('#data_max_disk_30d').innerText = data.max_disk_30d;
    element.querySelector('#data_max_disk_7d').innerText = data.max_disk_7d;
    element.querySelector('#data_max_disk_24h').innerText = data.max_disk_24h;
    element.querySelector('#data_min_disk_30d').innerText = data.min_disk_30d;
    element.querySelector('#data_min_disk_7d').innerText = data.min_disk_7d;
    element.querySelector('#data_min_disk_24h').innerText = data.min_disk_24h;

    // Insights
    data = json.insights;
    element = tab.querySelector('#data_insights');

    element.querySelector('#data_low_tps_players').innerText = data.low_tps_players;
    element.querySelector('#data_low_tps_entities').innerText = data.low_tps_entities;
    element.querySelector('#data_low_tps_chunks').innerText = data.low_tps_chunks;
    element.querySelector('#data_low_tps_cpu').innerText = data.low_tps_cpu;

    const dates = data.low_disk_space_dates;
    let dateString = '';
    for (let date of dates) {
        dateString += (date + '<br>')
    }

    element.querySelector('#data_low_disk_space_dates').innerHTML = dateString;
}