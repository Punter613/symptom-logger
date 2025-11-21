from collections import Counter

def summarize(entries):
    total = len(entries)
    if total == 0:
        return {"total_entries":0,"symptom_days":0,"severe_days":0,"average_severity":0,"common_triggers":[]}

    symptom_days = len([e for e in entries if int(e.get("severity",0)) > 0])
    severe_days = len([e for e in entries if int(e.get("severity",0)) >= 8])
    avg = round(sum(int(e["severity"]) for e in entries)/total,2)

    triggers = [e.get("trigger","").lower() for e in entries if e.get("trigger")]
    counts = Counter(triggers)

    return {
        "total_entries": total,
        "symptom_days": symptom_days,
        "severe_days": severe_days,
        "average_severity": avg,
        "common_triggers": [{"trigger":k,"count":v} for k,v in counts.most_common(5)]
    }
